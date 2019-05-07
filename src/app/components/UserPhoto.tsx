import * as React from "react";
import { useContext} from "react";
import { userContext } from "../context/UserContext";
import { ProfilePhoto } from "./styled/NavBar";

export default function UserPhoto() {
  const [user] = useContext(userContext);

  return (
    <div>
      {user && <ProfilePhoto src={user.photoURL} />}
    </div>
  );
}