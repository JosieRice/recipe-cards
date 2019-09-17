import * as React from "react";
import { ULCards, LICards, TitleContainer, Title, Plus } from "./styled/Page";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../context/UserContext";
import { auth, provider } from "../services/Firebase";
import { UserObj } from "../types/Globals";
import { toastError } from "../utilites/Settings";
import { useToasts } from 'react-toast-notifications';


const CreateNewCard = () => {
  return (
    <>
      <Plus src={"https://firebasestorage.googleapis.com/v0/b/original-recipe.appspot.com/o/assets%2Fplus.png?alt=media&token=df3ec1d7-8946-4e33-a857-0578bcb5ffcb"} />
      <TitleContainer>
        <Title>Create New</Title>
      </TitleContainer>
    </>
  )
}

export default function CreateNewButton() {
  const [user, setUser] = useContext(userContext);

  const { addToast } = useToasts();

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

  return (
    <ULCards>
      {user ?
        <LICards>
          <Link to="/newrecipe/">
            <CreateNewCard />
          </Link>
        </LICards>
        :
        <LICards>
          <a href="#" onClick={() => login()}>
            <CreateNewCard />
          </a>
        </LICards>

      }
    </ULCards >
  );
};