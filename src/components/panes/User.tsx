import { gql, useSuspenseQuery } from "@apollo/client";
import { PaneProps } from ".";
import { GetUsersQuery } from "@/gql/graphql";
import UserAvatar, { UserAvatarSkeleton } from "../UserAvatar";
import PaneHeader from "./Header";
import { Skeleton } from "../ui/skeleton";

const GET_USERS_QUERY = gql`
  query GetUsers($roomId: ID!) {
    room(id: $roomId) {
      id
      users {
        id
        name
        online
      }
    }
  }
`;

const UserPane = ({ roomId }: PaneProps) => {
  const { data } = useSuspenseQuery<GetUsersQuery>(GET_USERS_QUERY, {
    variables: { roomId },
    fetchPolicy: "cache-and-network",
  });

  return (
    <div className="min-w-[300px] p-4">
      <PaneHeader title="Users" className="pb-1" />
      <ul>
        {data.room.users.map((user) => (
          <li key={user.id} className="py-2 flex gap-2 items-center">
            <UserAvatar username={user.name} online={user.online} />
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const UserPaneSkeleton = () => (
  <div className="min-w-[300px] p-4">
    <PaneHeader title="Users" className="pb-1" />
    <ul>
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="py-2 flex gap-2 items-center">
          <UserAvatarSkeleton />
          <Skeleton className="w-20 h-4" />
        </li>
      ))}
    </ul>
  </div>
);

export default UserPane;
