import { https } from "firebase-functions";
import apolloServer from "./graphql/server";

const server = apolloServer();

// Graphql api
// https://us-central1-staging-or.cloudfunctions.net/api/api
const api = https.onRequest(server);

export { api };

// import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// // export const helloWorld = functions.https.onRequest((request, response) => {
// //   response.send("Hello from Firebase! staging");
// // });

// exports.test = functions.https.onCall((data, context) => {
//   return `${data} production`;
// });
