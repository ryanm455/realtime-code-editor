"use client";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import { createFile, createFolder } from "@/lib/file-queries";
import { leaveRoom } from "@/lib/room-queries";
import { useRouter } from "next/navigation";
import { Suspense, useCallback } from "react";
import { useSuspenseQuery } from "@apollo/client";
import { GetUserQuery } from "@/gql/graphql";
import { GET_USER_QUERY } from "@/lib/mutations";

type MenuProps = {
  roomId?: number | string;
};

const UserMenuItems = () => {
  const { data } = useSuspenseQuery<GetUserQuery>(GET_USER_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const isLoggedIn = !!data?.me;

  return (
    <>
      {isLoggedIn ? (
        <>
          <Link href="/profile">
            <MenubarItem>Profile</MenubarItem>
          </Link>
          <Link href="/profile/rooms">
            <MenubarItem>Joined Rooms</MenubarItem>
          </Link>
        </>
      ) : (
        <Link href="/">
          <MenubarItem>Login</MenubarItem>
        </Link>
      )}
    </>
  );
};

const Menu = ({ roomId }: MenuProps) => {
  const router = useRouter();

  const leaveRoomPush = useCallback(async () => {
    if (!roomId) return;
    await leaveRoom(roomId);
    router.push("/");
  }, [roomId, router]);

  return (
    <Menubar className="rounded-none border-b border-gray-200 px-2 lg:px-4">
      <MenubarMenu>
        <MenubarTrigger className="font-bold">Editor</MenubarTrigger>
        <MenubarContent>
          <Suspense fallback={null}>
            <UserMenuItems />
          </Suspense>
          <MenubarSeparator />
          <Link href="/about">
            <MenubarItem>About Editor</MenubarItem>
          </Link>
          <MenubarSeparator />
          <Link href="/profile/logout">
            <MenubarItem>Delete Account / Logout</MenubarItem>
          </Link>
          <Link href="/">
            <MenubarItem>Quit Editor</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
      {roomId && (
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => createFile(roomId)}>
              New File
            </MenubarItem>
            <MenubarItem onClick={() => createFolder(roomId)}>
              New Folder
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      )}

      <MenubarMenu>
        <MenubarTrigger>Room</MenubarTrigger>
        <MenubarContent>
          {roomId && (
            <>
              <Link href={`/editor/${roomId}?pane=setting`}>
                <MenubarItem>Room Settings</MenubarItem>
              </Link>
              <Link href={`/editor/${roomId}?pane=user`}>
                <MenubarItem>Room Members</MenubarItem>
              </Link>
              <MenubarSeparator />
              <MenubarItem onClick={leaveRoomPush}>Leave Room</MenubarItem>
              <MenubarSeparator />
            </>
          )}
          <Link href="/?option=join">
            <MenubarItem>Join Room</MenubarItem>
          </Link>
          <Link href="/?option=create">
            <MenubarItem>Create Room</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Menu;
