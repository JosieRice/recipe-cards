import { https } from "firebase-functions";
import apolloServer from "./graphql/server";

const server = apolloServer();

// Graphql api
// https://us-central1-<APP-NAME>.cloudfunctions.net/api/api
const api = https.onRequest(server);

export { api };
