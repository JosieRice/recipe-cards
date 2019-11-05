import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

function apolloServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
  });

  apolloServer.applyMiddleware({ app, path: "/", cors: true });

  return app;
}

export default apolloServer;
