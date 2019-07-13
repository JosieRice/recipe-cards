import * as React from "react";
import { NavButton } from "./styled/NavBar";
import { auth, provider } from "../services/Firebase";
import { UserObj } from "../types/Globals";
import { useEffect, useContext } from "react";
import { userContext } from "../context/UserContext";
import { Page } from "./styled/Page";

export default function LoginLogout() {
  const [user, setUser] = useContext(userContext);

  // persistent login after refresh
  useEffect(() => {
    auth.onAuthStateChanged((user: UserObj) => {
      if (user) {
        setUser(user);
        // identify user to FullStory
        window.FS.identify(user.uid, {
          displayName: user.displayName,
          email: user.email
        });
      }
    });
  }, []);

  function login() {
    auth.signInWithPopup(provider).then(result => {
      const user: UserObj = result.user;
      setUser(user);
      // identify user to FullStory
      window.FS.identify(user.uid, {
        displayName: user.displayName,
        email: user.email
      });
    });
  }

  function logout() {
    auth.signOut().then(() => {
      setUser(null);
      window.FS.identify(false);
    });
  }

  return (
    <div style={{marginRight: '40px'}}>
      {!user ? (
        <NavButton onClick={() => login()}>Log In</NavButton>
      ) : (
          <NavButton onClick={() => logout()}>Log Out</NavButton>
      )}
    </div>
  );
}

export function NotLoggedIn() {
  return (
    <Page>
      <p>Please Log In to see this page.</p>
    </Page>
  );
};