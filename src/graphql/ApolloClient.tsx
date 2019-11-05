import ApolloClient from "apollo-boost";

let uri = "https://us-central1-staging-or.cloudfunctions.net/api/api";

// sets to production graphql mircroservice when in production env
if (window.location.href === "https://original-recipe.com/") {
  uri = "https://us-central1-original-recipe.cloudfunctions.net/api/api";
}

const client = new ApolloClient({
  uri
});

export default client;
