"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar, { UserAvatarSkeleton } from "@/components/UserAvatar";
import { EditUsernameInput } from "@/components/UsernameInput";
import { GetUserAvatarQuery, UpdateProfileMutation } from "@/gql/graphql";
import { client } from "@/graphql/client";
import { useSuspenseQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Suspense } from "react";
import nextDynamic from "next/dynamic";
import { toast } from "@/lib/toast";

const GET_USER_AVATAR = gql`
  query GetUserAvatar {
    me {
      name
      online
    }
  }
`;

const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($name: String!) {
    updateUser(name: $name) {
      id
      name
    }
  }
`;

const ProfileAvatar = () => {
  const { data } = useSuspenseQuery<GetUserAvatarQuery>(GET_USER_AVATAR, {
    fetchPolicy: "cache-and-network",
  });

  if (!data.me) throw new Error("Not Authenticated");

  return (
    <>
      <div className="mb-2">
        <UserAvatar
          username={data.me.name}
          online={data.me.online}
          className="w-20 h-20 mx-auto"
        />
      </div>
      <div className="text-center">{data.me.name}</div>
    </>
  );
};

const ProfilePage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = new FormData(e.currentTarget).get("username") as string;

    client.mutate<UpdateProfileMutation>({
      mutation: UPDATE_PROFILE_MUTATION,
      variables: { name: username },
    });

    await toast("Username updated");
  };

  return (
    <div className="sm:mx-auto sm:container flex flex-col gap-4 overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <>
                <div className="mb-2">
                  <UserAvatarSkeleton className="w-20 h-20 mx-auto" />
                </div>
                <Skeleton className="w-20 h-5 mx-auto" />
              </>
            }
          >
            <ProfileAvatar />
          </Suspense>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Username</CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent>
            <EditUsernameInput name="username" />
          </CardContent>
          <CardFooter>
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;
