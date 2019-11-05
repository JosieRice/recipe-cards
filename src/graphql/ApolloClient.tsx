import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

let uri = "https://us-central1-staging-or.cloudfunctions.net/api/api";

// sets to production graphql mircroservice when in production env
if (window.location.href === "https://original-recipe.com/") {
  uri = "https://us-central1-original-recipe.cloudfunctions.net/api/api";
}

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri,
      credentials: "same-origin"
    })
  ]),
  cache: new InMemoryCache()
});

export default client;
