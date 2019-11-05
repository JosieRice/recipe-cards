import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://us-central1-staging-or.cloudfunctions.net/api/api"
});

export default client;
