import { GetUserQuery } from "@/gql/graphql";
import { useSuspenseQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Input } from "@/components/ui/input";
import { memo } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { GET_USER_QUERY } from "@/lib/mutations";

type InputProps = {
  name: string;
};

export const UsernameInput = memo(({ name }: InputProps) => {
  const { data } = useSuspenseQuery<GetUserQuery>(GET_USER_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const user = data.me;

  if (user) {
    return (
      <div className="flex gap-2 w-full">
        <Input type="text" name={name} value={user.name} disabled />
        <Link href="/profile">
          <Button type="button">Go Profile</Button>
        </Link>
      </div>
    );
  }

  return (
    <Input
      type="text"
      name="username"
      placeholder="Enter username"
      defaultValue=""
    />
  );
});

export const EditUsernameInput = memo(({ name }: InputProps) => {
  const { data } = useSuspenseQuery<GetUserQuery>(GET_USER_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const user = data.me;

  if (!user) throw new Error("Not authenticated");

  return (
    <Input
      type="text"
      name={name}
      placeholder="Enter username"
      defaultValue={user.name}
    />
  );
});

UsernameInput.displayName = "UsernameInput";
EditUsernameInput.displayName = "EditUsernameInput";
