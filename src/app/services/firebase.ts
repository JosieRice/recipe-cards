import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";
import "@firebase/functions";
import { config, stagingConfig } from "./Config";

// Initialize Firebase
if (!firebase) throw new Error("Firebase needs to exist."); // This state should be impossible to get into
switch (location.hostname) {
  case "original-recipe.com":
    firebase.initializeApp(config);
    break;
  case "staging-or.firebaseapp.com/":
    firebase.initializeApp(stagingConfig);
    break;
  default:
    firebase.initializeApp(stagingConfig);
    break;
}
// firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
