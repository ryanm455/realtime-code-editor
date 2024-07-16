"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogoutMutation } from "@/gql/graphql";
import { client } from "@/graphql/client";
import { toast } from "@/lib/toast";
import gql from "graphql-tag";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      id
    }
  }
`;

const LogoutPage = () => {
  const router = useRouter();

  const logout = useCallback(async () => {
    if (!confirm("Are you sure you want to logout?\nThis is irreversible and all data will be lost.")) return;

    await client.mutate<LogoutMutation>({
      mutation: LOGOUT_MUTATION,
    });
    await toast("Logged out");
    router.push("/");
  }, [router]);

  return (
    <div className="sm:mx-auto sm:container flex flex-col gap-4 overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle>Logout</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to logout?
            <br />
            You cannot get your account back or login again.
            <br />
            <strong>
              All your data will be lost and groups you have created will be
              destroyed.
            </strong>
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LogoutPage;
