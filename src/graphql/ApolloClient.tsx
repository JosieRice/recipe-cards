import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

let uri = "https://us-central1-staging-or.cloudfunctions.net/api/api";

// sets to production graphql mircroservice when in production env
if (window.location.href === "https://original-recipe.com/") {
  uri = "https://us-central1-original-recipe.cloudfunctions.net/api/api";
}

const httpLink = new HttpLink({
  uri,
  credentials: "same-origin"
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) console.error(`[Network error]: ${networkError}`);
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
});

const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  connectToDevTools: true,
  link,
  cache,
  typeDefs,
  resolvers
});

export default client;
