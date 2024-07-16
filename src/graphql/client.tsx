import { split, HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

//import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

// if (process.env.NODE_ENV === "development") {
//   console.log("loading dev messages");
//   // Adds messages only in a dev environment
//   loadDevMessages();
//   loadErrorMessages();
// }

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
  fetchOptions: { cache: "no-store" },
});

export const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:3000/graphql",
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

// export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
//   return client;
// });
