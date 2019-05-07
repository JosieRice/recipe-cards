import * as React from "react";
import { NavButton } from "./styled/NavBar";
import { auth, provider } from "../services/Firebase";
import { UserObj } from "../types/UserObj";
import { useEffect, useContext } from "react";
import { userContext } from "../context/UserContext";

export default function LoginLogout() {
  const [user, setUser] = useContext(userContext);

  // persistent login after refresh
  useEffect(() => {
    auth.onAuthStateChanged((user: UserObj) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function login() {
    auth.signInWithPopup(provider).then(result => {
      const user: UserObj = result.user;
      setUser(user);
    });
  }

  function logout() {
    auth.signOut().then(() => {
      setUser(null);
    });
  }

  return (
    <div>
      {!user ? (
        <NavButton onClick={() => login()}>Log In</NavButton>
      ) : (
          <NavButton onClick={() => logout()}>Log Out</NavButton>
      )}
    </div>
  );
}
