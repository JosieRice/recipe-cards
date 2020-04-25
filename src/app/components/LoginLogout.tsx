import * as React from "react";
import { NavButton } from "./styled/NavBar";
import { auth, provider } from "../services/Firebase";
import { UserObj } from "../types/Globals";
import { useEffect, useContext } from "react";
import { userContext } from "../context/UserContext";
import { Page } from "./styled/Page";
import { toastError } from "../utilites/Settings";
import { useToasts } from "react-toast-notifications";

export default function LoginLogout() {
  const [user, setUser] = useContext(userContext);
  const { addToast } = useToasts();

  useEffect(() => {
    auth.onAuthStateChanged(async (user: UserObj) => {
      if (user) {
        // firebase version of jwt generation being set to pass to graphql server
        const idToken = await auth.currentUser.getIdToken().then((token) => token);
        localStorage.setItem("token", idToken);
        
        setUser(user);

        // identify user to FullStory
        window.FS.identify(user.uid, {
          displayName: user.displayName,
          email: user.email,
        });
      }
    });
  }, []);

  function login() {
    auth
      .signInWithPopup(provider)
      .then(async (result) => {
        const user: UserObj = {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          uid: result.user.uid, //should be in the token (remove soon), keeping for fs for now
        };

        // firebase version of jwt generation being set to pass to graphql server
        const idToken = await auth.currentUser.getIdToken().then((token) => token);
        localStorage.setItem("token", idToken);

        setUser(user);

        // identify user to FullStory
        window.FS.identify(user.uid, {
          displayName: user.displayName,
          email: user.email,
        });
      })
      .catch(function (error) {
        addToast(`Unable to login because ${error}, try again later`, toastError);
        console.error("Error adding document: ", error);
      });
  }

  function logout() {
    auth
      .signOut()
      .then(() => {
        // clear all information about user
        setUser(null);
        window.FS.identify(false);
        localStorage.clear();
      })
      .catch(function (error) {
        addToast(`Unable to logout because ${error}, try again later`, toastError);
        console.error("Error adding document: ", error);
      });
  }

  return <div style={{ marginRight: "40px" }}>{!user ? <NavButton onClick={() => login()}>Log In</NavButton> : <NavButton onClick={() => logout()}>Log Out</NavButton>}</div>;
}

export function NotLoggedIn() {
  return (
    <Page>
      <p>Please Log In to see this page.</p>
    </Page>
  );
}
