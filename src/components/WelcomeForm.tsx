"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense, useState } from "react";
import { ClipboardIcon, CopyIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import gql from "graphql-tag";
import { client } from "@/graphql/client";
import { CreateRoomMutation, LoginMutation } from "@/gql/graphql";
import { UsernameInput } from "@/components/UsernameInput";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/lib/toast";
import { parseAsStringEnum, useQueryState } from "nuqs";

enum Option {
  Create = "create",
  Join = "join",
}

const LOGIN_MUTATION = gql`
  mutation Login($name: String!) {
    login(name: $name) {
      id
      name
    }
  }
`;

const CREATE_ROOM_MUTATION = gql`
  mutation CreateRoom($name: String!, $id: ID!) {
    createRoom(name: $name, id: $id) {
      id
      name
    }
  }
`;

const JOIN_ROOM_MUTATION = gql`
  mutation JoinRoom($roomId: ID!) {
    joinRoom(id: $roomId) {
      id
    }
  }
`;

const WelcomeForm = () => {
  const router = useRouter();
  const [roomName, setRoomName] = useState<string>("");
  const [roomId, setRoomId] = useState<number | undefined>();
  const [option, setOption] = useQueryState<Option>(
    "option",
    parseAsStringEnum<Option>(Object.values(Option)).withDefault(Option.Create)
  );

  const generateCode = () => {
    const roomId = Math.floor(Math.random() * 1000000);
    setRoomId(roomId);
  };

  const copyCode = async () => {
    if (!roomId) return await toast("No code to copy");
    navigator.clipboard.writeText(roomId?.toString());
    await toast("Code copied to clipboard");
  };

  const pasteCode = async () => {
    const code = await navigator.clipboard.readText();
    if (!/^\d+$/.test(code)) return await toast("Invalid code");
    setRoomId(Number(code));
  };

  const joinRoom = async (roomId: number) => {
    await client.mutate({
      mutation: JOIN_ROOM_MUTATION,
      variables: { roomId },
    });
  };

  const login = async (name: string) => {
    const res = await client.mutate<LoginMutation>({
      mutation: LOGIN_MUTATION,
      variables: { name },
    });

    return res.data?.login;
  };

  const createRoom = async (name: string, id: number) => {
    const res = await client.mutate<CreateRoomMutation>({
      mutation: CREATE_ROOM_MUTATION,
      variables: { name, id },
    });

    return res.data?.createRoom;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = (e.target as any).username.value;

    const isLoggedIn = (e.target as any).username.disabled;

    console.log("submitting", username, roomId);

    console.log("isLoggedIn", isLoggedIn);

    if (!username || !roomId) {
      return await toast("Please fill in all fields");
    }

    if (!isLoggedIn) {
      if (!(await login(username))) {
        return await toast("Failed to login/register user on server");
      }
    }

    if (option == "create") {
      const room = await createRoom(roomName, roomId);

      if (!room) {
        return await toast("Failed to create room");
      }
    }

    await joinRoom(roomId);
    router.push(`/editor/${roomId}`);
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="flex gap-2 mt-4">
        <Suspense fallback={<Skeleton className="w-full h-9" />}>
          <UsernameInput name="username" />
        </Suspense>
      </div>

      <Tabs
        className="mt-4"
        value={option}
        onValueChange={(o) => setOption(o as Option)}
      >
        <TabsList>
          <TabsTrigger value={Option.Create}>Create</TabsTrigger>
          <TabsTrigger value={Option.Join}>Join</TabsTrigger>
        </TabsList>
        <TabsContent value={Option.Create}>
          <Input
            className="mt-4"
            type="text"
            placeholder="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <Input
              type="text"
              placeholder="Code"
              value={roomId || ""}
              disabled
            />
            <Button
              onClick={copyCode}
              type="button"
              variant="secondary"
              size="icon"
              className="min-w-9"
              disabled={!roomId}
            >
              <CopyIcon className="h-4 w-4" />
            </Button>
            <Button onClick={generateCode} type="button">
              Generate Code
            </Button>
          </div>
        </TabsContent>
        <TabsContent value={Option.Join}>
          <div className="flex gap-2 mt-4">
            <Input
              type="text"
              placeholder="Code"
              value={roomId}
              onChange={(t) => setRoomId(Number(t.target.value))}
            />
            <Button
              onClick={pasteCode}
              type="button"
              variant="secondary"
              size="icon"
              className="min-w-9"
            >
              <ClipboardIcon className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      <Button className="mt-4" type="submit">
        Join
      </Button>
    </form>
  );
};

export default WelcomeForm;
