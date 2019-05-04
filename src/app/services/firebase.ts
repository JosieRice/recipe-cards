import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import { devConfig } from "./Config";

// Initialize Firebase
if (!firebase) throw new Error("Firebase needs to exist."); // This state should be impossible to get into
firebase.initializeApp(devConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
