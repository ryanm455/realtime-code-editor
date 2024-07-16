import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { schema } from "@/graphql/schema";
import { NextRequest } from "next/server";
import { cookies, headers } from "next/headers";
import { CloseCode, makeServer } from "graphql-ws";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { prisma } from "@/prisma/client";
import { MutationType, pubsub, PubSubFileEditorEvent } from "@/graphql/pubsub";
import { jwtVerify, JWTPayload } from "jose";
import { secretKey } from "@/lib/secret-key";
import { WebSocket, WebSocketServer } from "ws";
import { IncomingMessage } from "http";

export type Context = {
  userId: () => Promise<number | undefined>;
  pubsub: typeof pubsub;
};

const createContext = (): Context => ({
  userId: async (): Promise<number | undefined> => {
    const cookieStore = cookies();
    const headerStore = headers();

    let token: string | undefined;

    if (headerStore.has("Authorization")) {
      token = headerStore.get("Authorization")!.replace("Bearer ", "");
    } else if (cookieStore.has("userId")) {
      token = cookieStore.get("userId")!.value;
    }

    if (!token) return undefined;

    try {
      const { payload } = await jwtVerify(token, secretKey);
      return Number((payload as JWTPayload).id);
    } catch (err) {
      console.error(err);
      cookieStore.delete("userId");
      return undefined;
    }
  },
  pubsub,
});

type Subscription = {
  type: string;
  data: any;
};

const subscriptionsMap = new Map<string, Subscription>();

const context = createContext();

const subServer = makeServer({ schema, context: () => ({ ...context }) });

const server = new ApolloServer({
  schema,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({
    req,
    ...context,
  }),
});

export { handler as GET, handler as POST };

export const SOCKET = async (
  client: WebSocket,
  request: IncomingMessage,
  wsServer: WebSocketServer
) => {
  const activeFiles = new Set<number>();

  const getUserIdFromRequest = async (): Promise<number | null> => {
    if (!request.headers.cookie) return null;
    const parsedCookies = parseCookie(request.headers.cookie);

    let token: string | undefined;

    if (request.headers.authorization) {
      token = request.headers.authorization!.replace("Bearer ", "");
    } else if (parsedCookies.has("userId")) {
      token = parsedCookies.get("userId");
    }

    if (!token) return null;

    try {
      const { payload } = await jwtVerify(token, secretKey);
      return Number((payload as JWTPayload).id);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const userId = await getUserIdFromRequest();

  if (userId) {
    await prisma.user.update({
      where: { id: userId },
      data: { numSessions: { increment: 1 } },
    });
  }

  const closed = subServer.opened(
    {
      protocol: client.protocol,
      send: (data) =>
        new Promise((resolve, reject) => {
          client.send(data, (err) => (err ? reject(err) : resolve()));
        }),
      close: (code, reason) => client.close(code, reason),
      onMessage: (cb) =>
        client.on("message", async (event) => {
          try {
            await cb(event.toString());
          } catch (err: any) {
            client.close(CloseCode.InternalServerError, err.message);
          }
        }),
    },
    { socket: client, request }
  );

  client.once("close", (code, reason) => closed(code, reason.toString()));

  client.on("message", async (message: Buffer) => {
    const msg = JSON.parse(message.toString());

    switch (msg.type) {
      case "connection_init":
        break;
      case "subscribe":
        if (msg.payload.query.includes("fileChange") && userId) {
          const fileId = Number(msg.payload.variables.fileId);
          subscriptionsMap.set(msg.id, {
            type: "fileChange",
            data: { fileId },
          });
          activeFiles.add(fileId);

          const user = await prisma.user.update({
            where: { id: userId },
            data: { editingFiles: { connect: { id: fileId } } },
          });

          await context.pubsub.publish("FILE_EDITOR", {
            fileId,
            editor: user,
            mutationType: MutationType.CREATED,
          } as PubSubFileEditorEvent);

          console.log(`User ${userId} is editing file ${fileId}`);
        }
        break;
      case "complete":
        // user stopped subscribing to a subscription
        const subscription = subscriptionsMap.get(msg.id);

        if (subscription?.type === "fileChange" && userId) {
          const fileId = subscription.data.fileId;
          activeFiles.delete(fileId);

          const user = await prisma.user.update({
            where: { id: userId },
            data: { editingFiles: { disconnect: { id: fileId } } },
          });

          await context.pubsub.publish("FILE_EDITOR", {
            fileId,
            editor: user,
            mutationType: MutationType.DELETED,
          } as PubSubFileEditorEvent);

          console.log(`User ${userId} stopped editing file ${fileId}`);
        }

        break;
      default:
        console.log("received message", msg);
    }
  });

  client.on("close", async () => {
    if (!userId) return;

    await prisma.user.update({
      where: { id: userId },
      data: { numSessions: { decrement: 1 } },
    });

    activeFiles.forEach(async (fileId) => {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { editingFiles: { disconnect: { id: fileId } } },
      });

      await context.pubsub.publish("FILE_EDITOR", {
        fileId,
        editor: user,
        mutationType: MutationType.DELETED,
      } as PubSubFileEditorEvent);

      console.log(`User ${userId} stopped editing file ${fileId}`);
    });
  });
};
