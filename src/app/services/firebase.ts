import { firebase } from "@firebase/app";
import '@firebase/auth'
import { devConfig } from './Config';

// Initialize Firebase
if(!firebase) throw new Error("Firebase needs to exist."); // This state should be impossible to get into
firebase.initializeApp(devConfig);
export const app = firebase;

export function auth() {
  const authFn = firebase.auth;
  if (!authFn) throw new Error("Auth needs to exist."); // This state should be impossible to get into
  return authFn();
}