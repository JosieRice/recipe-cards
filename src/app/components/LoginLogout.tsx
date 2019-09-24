import * as React from "react";
import { NavButton } from "./styled/NavBar";
import { auth, provider } from "../services/Firebase";
import { UserObj } from "../types/User";
import { useEffect, useContext } from "react";
import { userContext } from "../context/UserContext";
import { Page } from "./styled/Page";
import { toastError } from "../utilites/Settings";
import { useToasts } from 'react-toast-notifications';

export default function LoginLogout() {
  const [user, setUser] = useContext(userContext);

  const { addToast } = useToasts();

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
    auth
      .signInWithPopup(provider)
      .then(result => {
        const user: UserObj = result.user;
        setUser(user);

        // identify user to FullStory
        window.FS.identify(user.uid, {
          displayName: user.displayName,
          email: user.email
        });

      })
      .catch(function (error) {
        addToast(`Unable to login because ${error}, try again later`, toastError)
        console.error("Error adding document: ", error);
      });
  }

  function logout() {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        window.FS.identify(false);
      })
      .catch(function (error) {
        addToast(`Unable to logout because ${error}, try again later`, toastError);
        console.error("Error adding document: ", error);
      });
  }

  return (
    <div style={{ marginRight: '40px' }}>
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