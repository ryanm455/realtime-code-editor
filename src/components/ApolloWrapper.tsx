"use client";
import { client } from "@/graphql/client";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";

function makeClient() {
  return client;
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
