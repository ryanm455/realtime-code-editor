import { client } from "@/graphql/client";
import { toast } from "@/lib/toast";
import { DELETE_ROOM_MUTATION, LEAVE_ROOM_MUTATION } from "./mutations";

export const leaveRoom = async (roomId: number | string) => {
  await client.mutate({
    mutation: LEAVE_ROOM_MUTATION,
    variables: { roomId },
  });
  await toast("Left room");
};

export const deleteRoom = async (roomId: number | string) => {
  await client.mutate({
    mutation: DELETE_ROOM_MUTATION,
    variables: { roomId },
  });

  await toast("Deleted room");
};
