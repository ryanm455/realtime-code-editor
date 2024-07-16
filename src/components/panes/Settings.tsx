import { gql, useSuspenseQuery } from "@apollo/client";
import { PaneProps } from ".";
import { Switch } from "../ui/switch";
import PaneHeader from "./Header";
import { Skeleton } from "../ui/skeleton";
import { GetRoomQuery } from "@/gql/graphql";
import { client } from "@/graphql/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

const GET_ROOM = gql`
  query GetRoom($roomId: ID!) {
    room(id: $roomId) {
      id
      locked
      isCreator
    }
  }
`;

const SET_ROOM_LOCKED_MUTATION = gql`
  mutation SetRoomLocked($roomId: ID!, $locked: Boolean!) {
    setRoomLocked(roomId: $roomId, locked: $locked) {
      id
      locked
    }
  }
`;

const DELETE_ROOM_MUTATION = gql`
  mutation DeleteRoom($roomId: ID!) {
    deleteRoom(id: $roomId) {
      id
    }
  }
`;

const SettingsPane = ({ roomId }: PaneProps) => {
  const router = useRouter();
  const { data } = useSuspenseQuery<GetRoomQuery>(GET_ROOM, {
    variables: { roomId },
    fetchPolicy: "cache-and-network",
  });

  const toggleLocked = async (locked: boolean) => {
    await client.mutate({
      mutation: SET_ROOM_LOCKED_MUTATION,
      variables: { roomId, locked },
    });

    client.writeQuery({
      query: GET_ROOM,
      data: { ...data, room: { ...data.room, locked } },
    });
  };

  const deleteRoom = async () => {
    await client.mutate({
      mutation: DELETE_ROOM_MUTATION,
      variables: { roomId },
    });

    await toast("Room deleted");
    router.push("/");
  };

  return (
    <div className="min-w-[300px] p-4">
      <PaneHeader title="Settings" className="pb-1" />
      <ul>
        <li className="flex justify-between items-center py-2">
          <div>Locked</div>
          <Switch
            checked={data.room.locked}
            onCheckedChange={toggleLocked}
            disabled={!data.room.isCreator}
          />
        </li>
        <li>
          <Button
            className="w-full my-2"
            onClick={deleteRoom}
            disabled={!data.room.isCreator}
          >
            Delete Room
          </Button>
        </li>
      </ul>
    </div>
  );
};

export const SettingsPaneSkeleton = () => (
  <div className="min-w-[300px] p-4">
    <PaneHeader title="Settings" className="pb-1" />
    <ul>
      <li className="flex justify-between items-center py-2">
        <Skeleton className="w-20 h-4 bg-gray-200 rounded" />
        <Skeleton className="w-20 h-4 bg-gray-200 rounded" />
      </li>
      <Skeleton className="w-full h-12 mt-4 bg-gray-200 rounded" />
    </ul>
  </div>
);

export default SettingsPane;
