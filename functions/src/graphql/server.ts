import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import admin from "firebase-admin";

function apolloServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: async ({ req }) => {
      // Get the user token from the headers.
      // How do I ensure that if the user is logged in this information get's updated?
      const token = req.headers.authorization || "";

      // decode token to get uid
      let uid = await admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
          return decodedToken.uid;
        })
        .catch((error) => console.error("ERROR: ", error));

      // add UID to context
      return { uid };
    },
  });

  apolloServer.applyMiddleware({ app, path: "/", cors: true });

  return app;
}

export default apolloServer;
