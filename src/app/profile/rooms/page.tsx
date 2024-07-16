"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { GetJoinedRoomsQuery, RoomItemFragment } from "@/gql/graphql";
import { GET_JOINED_ROOMS } from "@/lib/mutations";
import { deleteRoom, leaveRoom } from "@/lib/room-queries";
import { useSuspenseQuery } from "@apollo/client";
import { ExitIcon } from "@radix-ui/react-icons";
import { ChevronDownIcon, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const RoomItem = ({
  id,
  name,
  isCreator,
  creator: { name: creatorName },
}: RoomItemFragment) => (
  <div className="flex justify-between items-center py-2">
    <div>
      <p className="text-sm font-medium leading-none">{name}</p>
      <p className="text-sm text-muted-foreground">created by {creatorName}</p>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ChevronDownIcon className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={`/editor/${id}`}>
          <DropdownMenuItem>
            <PencilIcon className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => deleteRoom(id)} disabled={!isCreator}>
          <TrashIcon className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => leaveRoom(id)}>
          <ExitIcon className="mr-2 h-4 w-4" />
          Leave
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

const RoomItemSkeleton = () => (
  <div className="flex justify-between py-2">
    <div className="flex flex-col gap-1">
      <Skeleton className="w-20 h-4" />
      <Skeleton className="w-28 h-3" />
    </div>
    <Skeleton className="w-12 h-9" />
  </div>
);

const JoinedRooms = () => {
  const { data } = useSuspenseQuery<GetJoinedRoomsQuery>(GET_JOINED_ROOMS, {
    fetchPolicy: "cache-and-network",
  });

  if (!data.me) throw new Error("Not authenticated");

  return (
    <div>
      {data.me!.joinedRooms.map((room) => (
        // @ts-ignore
        <RoomItem key={room.id} userId={data.me.id} {...room} />
      ))}
    </div>
  );
};

const JoinedRoomsSkeleton = () => (
  <>
    {Array.from({ length: 5 }).map((_, i) => (
      <RoomItemSkeleton key={i} />
    ))}
  </>
);

const JoinedRoomsPage = () => {
  return (
    <div className="sm:mx-auto sm:container flex flex-col gap-4 overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle>Joined Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<JoinedRoomsSkeleton />}>
            <JoinedRooms />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinedRoomsPage;
