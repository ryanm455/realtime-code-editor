import { cookies } from "next/headers";
import { Document, Node, Room, User } from "@prisma/client";
import { prisma } from "@/prisma/client";
import { builder } from "./builder";
import { withFilter } from "graphql-subscriptions";
import {
  MutationType,
  PubSubEvent,
  PubSubFileChangeEvent,
  PubSubFileEditorEvent,
  PubSubNodeEvent,
} from "./pubsub";
import documentManager from "@/lib/doc-manager";
import { base64ToChanges } from "@/lib/doc-utils";
import { SignJWT } from "jose";
import { secretKey } from "@/lib/secret-key";

const extensionToLanguageMap: Record<string, string> = {
  txt: "plaintext",
  js: "javascript",
  ts: "typescript",
  html: "html",
  css: "css",
  json: "json",
  xml: "xml",
  py: "python",
  java: "java",
  c: "c",
  cpp: "cpp",
  cs: "csharp",
  php: "php",
  rb: "ruby",
  go: "go",
  rs: "rust",
  swift: "swift",
  md: "markdown",
  // Add more if needed
};

const getLanguageFromExtension = (ext: string | undefined): string => {
  if (!ext) return "plaintext";
  return extensionToLanguageMap[ext] || "plaintext";
};

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    // @ts-ignore no clue why this throws an error lol
    name: t.exposeString("name"),
    online: t.field({
      type: "Boolean",
      resolve: (user: User) => user.numSessions > 0,
    }),
    editingFiles: t.relation("editingFiles"),
    createdRooms: t.relation("createdRooms"),
    joinedRooms: t.relation("joinedRooms"),
  }),
});

builder.prismaObject("Room", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    nodes: t.relation("nodes"),
    creator: t.relation("creator"),
    creatorId: t.exposeID("creatorId"),
    users: t.relation("users"),
    locked: t.exposeBoolean("locked"),
    isCreator: t.field({
      type: "Boolean",
      resolve: async (room: Room, _, ctx) =>
        room.creatorId === (await ctx.userId()),
    }),
  }),
});

enum NodeType {
  FILE = "FILE",
  FOLDER = "FOLDER",
}

builder.enumType(NodeType, {
  name: "NodeType",
});

builder.prismaObject("Node", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    type: t.field({
      type: NodeType,
      resolve: (node: Node) => NodeType[node.type as keyof typeof NodeType],
    }),
    room: t.relation("room"),
    roomId: t.exposeID("roomId"),
    parent: t.relation("parent"),
    parentId: t.exposeID("parentId", { nullable: true }),
    children: t.relation("children"),
    file: t.relation("file", { nullable: true }),
    fileId: t.exposeID("fileId", { nullable: true }),
  }),
});

builder.prismaObject("Document", {
  fields: (t) => ({
    id: t.exposeID("id"),
    content: t.exposeString("content", { nullable: true }),
    node: t.relation("node"),
    editors: t.relation("editors"),
    lastModifiedBy: t.relation("lastModifiedBy"),
    language: t.field({
      type: "String",
      resolve: async (file: Document) => {
        const node = await prisma.node.findUnique({
          where: { fileId: file.id },
        });

        const ext = node?.name.split(".").pop();
        return getLanguageFromExtension(ext);
      },
    }),
  }),
});

builder.queryType({
  fields: (t) => ({
    me: t.prismaField({
      type: "User",
      nullable: true,
      resolve: async (query, root, args, ctx, info) => {
        const userId = await ctx.userId();

        if (!userId) return null;

        return prisma.user
          .findUniqueOrThrow({
            ...query,
            where: { id: userId },
          })
          .catch(() => {
            cookies().delete("userId");
            return null;
          });
      },
    }),
    room: t.prismaField({
      type: "Room",
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: (query, root, { id }, ctx, info) =>
        prisma.room.findUniqueOrThrow({
          ...query,
          where: { id: Number(id) },
        }),
    }),
    node: t.prismaField({
      type: "Node",
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: (query, root, { id }, ctx, info) =>
        prisma.node.findUniqueOrThrow({
          ...query,
          where: { id: Number(id) },
        }),
    }),
    file: t.prismaField({
      type: "Document",
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (query, root, { id }, ctx, info) => {
        const file = await prisma.document.findUniqueOrThrow({
          ...query,
          where: { id: Number(id) },
        });

        const cachedDoc = await documentManager.getDocument(file);

        return { ...file, content: cachedDoc.getCurrentState() };
      },
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    login: t.prismaField({
      type: "User",
      args: {
        name: t.arg.string({ required: true }),
      },
      resolve: async (_, __, { name }, ctx) => {
        const userId = await ctx.userId();

        if (userId) throw new Error("Already logged in");

        const user = await prisma.user.create({
          data: { name },
        });

        const token = await new SignJWT({
          id: user.id,
        })
          .setProtectedHeader({
            alg: "HS256",
          })
          .setIssuedAt()
          .setExpirationTime("5 years")
          .sign(secretKey);

        cookies().set("userId", token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 5), // 5 years
          httpOnly: true,
        });

        return user;
      },
    }),
    logout: t.prismaField({
      type: "User",
      resolve: async (_, __, ___, ctx) => {
        const userId = await ctx.userId();
        if (!userId) {
          throw new Error("Not logged in");
        }

        cookies().delete("userId");

        return prisma.user.delete({
          where: { id: userId },
        });
      },
    }),
    updateUser: t.prismaField({
      type: "User",
      args: {
        name: t.arg.string({ required: true }),
      },
      resolve: async (_, __, { name }, ctx) => {
        const userId = await ctx.userId();
        if (!userId) {
          throw new Error("Not logged in");
        }

        return prisma.user.update({
          where: { id: userId },
          data: { name },
        });
      },
    }),
    createRoom: t.prismaField({
      type: "Room",
      args: {
        id: t.arg.id({ required: true }),
        name: t.arg.string({ required: true }),
      },
      resolve: async (_, __, { id, name }, ctx) => {
        const userId = await ctx.userId();
        if (!userId) {
          throw new Error("Not logged in");
        }

        return prisma.room.create({
          data: {
            id: Number(id),
            name,
            creatorId: userId,
          },
        });
      },
    }),
    joinRoom: t.prismaField({
      type: "Room",
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (_, __, { id }, ctx) => {
        const userId = await ctx.userId();

        if (!userId) {
          throw new Error("Not logged in");
        }

        const room = await prisma.room.findUnique({
          where: { id: Number(id) },
        });

        if (!room) {
          throw new Error("Room not found");
        }

        if (room.locked) {
          throw new Error("Room is locked");
        }

        return prisma.room.update({
          where: { id: Number(id) },
          data: {
            users: {
              connect: { id: userId },
            },
          },
        });
      },
    }),
    leaveRoom: t.prismaField({
      type: "Room",
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (_, __, { id }, ctx) => {
        const userId = await ctx.userId();

        if (!userId) {
          throw new Error("Not logged in");
        }

        return prisma.room.update({
          where: { id: Number(id) },
          data: {
            users: {
              disconnect: { id: userId },
            },
          },
        });
      },
    }),
    deleteRoom: t.prismaField({
      type: "Room",
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (_, __, { id }, ctx) => {
        const userId = await ctx.userId();

        if (!userId) {
          throw new Error("Not logged in");
        }

        const room = await prisma.room.findUnique({
          where: { id: Number(id) },
        });

        if (!room) {
          throw new Error("Room not found");
        }

        if (room.creatorId !== userId) {
          throw new Error("Not the creator of the room");
        }

        return prisma.room.delete({
          where: { id: Number(id) },
        });
      },
    }),
    setRoomLocked: t.prismaField({
      type: "Room",
      args: {
        roomId: t.arg.id({ required: true }),
        locked: t.arg.boolean({ required: true }),
      },
      resolve: async (_, __, { roomId, locked }, ctx) => {
        const userId = await ctx.userId();

        if (!userId) {
          throw new Error("Not logged in");
        }

        const room = await prisma.room.findUnique({
          where: { id: Number(roomId) },
        });

        if (!room) {
          throw new Error("Room not found");
        }

        if (room.creatorId !== userId) {
          throw new Error("Not the creator of the room");
        }

        return prisma.room.update({
          where: { id: Number(roomId) },
          data: { locked },
        });
      },
    }),
    createNode: t.prismaField({
      type: "Node",
      args: {
        roomId: t.arg.id({ required: true }),
        parentId: t.arg.id({ required: false }),
        name: t.arg.string({ required: true }),
        type: t.arg({
          type: NodeType,
          required: true,
        }),
      },
      resolve: async (_, __, { roomId, parentId, name, type }, { pubsub }) => {
        let fileId: number | null = null;

        if (type === NodeType.FILE) {
          const file = await prisma.document.create({
            data: {},
          });
          fileId = file.id;
        }

        const node = await prisma.node.create({
          data: {
            name,
            type,
            roomId: Number(roomId),
            parentId: parentId ? Number(parentId) : null,
            fileId: fileId,
          },
        });

        await pubsub.publish("NODE", {
          node,
          roomId: node.roomId,
          mutationType: MutationType.CREATED,
        } as PubSubNodeEvent);

        return node;
      },
    }),
    deleteNode: t.prismaField({
      type: "Node",
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (_, __, { id }, { pubsub }) => {
        const node = await prisma.node.delete({
          where: { id: Number(id) },
        });

        await pubsub.publish("NODE", {
          node,
          roomId: node.roomId,
          mutationType: MutationType.DELETED,
        } as PubSubNodeEvent);

        return node;
      },
    }),
    updateNode: t.prismaField({
      type: "Node",
      args: {
        id: t.arg.id({ required: true }),
        name: t.arg.string({ required: true }),
      },
      resolve: async (_, __, { id, name }, { pubsub }) => {
        const node = await prisma.node.update({
          where: { id: Number(id) },
          data: { name },
        });

        await pubsub.publish("NODE", {
          node,
          roomId: node.roomId,
          mutationType: MutationType.UPDATED,
        } as PubSubNodeEvent);

        return node;
      },
    }),
    updateFile: t.field({
      type: "String",
      args: {
        id: t.arg.id({ required: true }),
        changes: t.arg.string({ required: true }),
      },
      resolve: async (_, { id, changes }, { pubsub, ...ctx }) => {
        const userId = await ctx.userId();
        if (!userId) {
          throw new Error("Not logged in");
        }

        const file = await documentManager.getDocument(Number(id));

        await prisma.document.update({
          where: { id: Number(id) },
          data: { lastModifiedById: Number(userId) },
        });

        file.applyChanges(base64ToChanges(JSON.parse(changes)));

        await pubsub.publish("FILE_CHANGE", {
          changes,
          id: Number(id),
        } as PubSubFileChangeEvent);

        console.log("Changes applied");

        return changes;
      },
    }),
  }),
});

const SubscriptionEvent = builder
  .interfaceRef<PubSubEvent>("SubscriptionEvent")
  .implement({
    fields: (t) => ({
      mutationType: t.exposeString("mutationType"),
    }),
  });

const SubscriptionNodeEvent = builder.objectRef<PubSubNodeEvent>(
  "SubscriptionNodeEvent"
);

SubscriptionNodeEvent.implement({
  interfaces: [SubscriptionEvent],
  fields: (t) => ({
    node: t.prismaField({
      type: "Node",
      resolve: (query, event) => event.node,
    }),
  }),
});

const SubscriptionFileEditorEvent = builder.objectRef<PubSubFileEditorEvent>(
  "SubscriptionFileEditorEvent"
);

SubscriptionFileEditorEvent.implement({
  interfaces: [SubscriptionEvent],
  fields: (t) => ({
    fileId: t.exposeID("fileId"),
    editor: t.prismaField({
      type: "User",
      resolve: (query, event) => event.editor,
    }),
  }),
});

builder.subscriptionType({
  fields: (t) => ({
    node: t.field({
      type: SubscriptionNodeEvent,
      args: {
        roomId: t.arg.id({ required: true }),
      },
      // @ts-ignore
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator("NODE"),
        (payload: PubSubNodeEvent, variables) =>
          payload.node.roomId == variables.roomId
      ),
      resolve: (payload: PubSubNodeEvent) => payload,
    }),
    fileChange: t.field({
      type: "String",
      args: {
        id: t.arg.id({ required: true }),
      },
      // @ts-ignore
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator("FILE_CHANGE"),
        (payload, variables) => payload.id == variables.id
      ),
      resolve: (payload: PubSubFileChangeEvent) => payload.changes,
    }),
    fileEditor: t.field({
      type: SubscriptionFileEditorEvent,
      args: {
        fileId: t.arg.id({ required: true }),
      },
      // @ts-ignore
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator("FILE_EDITOR"),
        (payload: PubSubFileEditorEvent, variables) =>
          payload.fileId === Number(variables.fileId)
      ),
      resolve: (payload: PubSubFileEditorEvent) => payload,
    }),
  }),
});

export const schema = builder.toSchema();
