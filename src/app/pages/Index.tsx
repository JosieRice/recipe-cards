import * as React from "react";
import { Page, H1 } from "../components/styled/Page";
import { Link, Route } from "react-router-dom";
import { auth, provider } from "../services/Firebase";
import { useToasts } from "react-toast-notifications";
import { toastError } from "../utilites/Settings";
import Loading from "../components/Loading";
import RecipeList from "../components/RecipeList";
import ModalRecipe from "./ModalRecipe";
import { useContext } from "react";
import { userContext } from "../context/UserContext";
import { UserObj } from "../types/Globals";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const RECIPES = gql`
  {
    recipes {
      id
      cookInstructions
      cookTime
      creatorUid
      dateUpdated
      description
      displayName
      imageUrl
      ingredients
      prepInstructins
      prepTime
      recipeName
      sourceType
      sourceUrl
    }
  }
`;

export default function Index({ match }: any) {
  const { loading, error, data } = useQuery(RECIPES);

  // TODO: toast on error
  // (
  // addToast(
  //   `Unable to load recipes because ${error}, try again later`,
  //   toastError
  // );
  // )

  if (loading) return <Loading />;
  if (error) return <div>error</div>;

  console.log("Loading: ", loading);

  const [user, setUser] = useContext(userContext);
  const { recipes } = data;
  console.log("RECIPES: ", recipes);

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
      .catch(function(error) {
        addToast(
          `Unable to login because ${error}, try again later`,
          toastError
        );
        console.error("Error adding document: ", error);
      });
  }

  return (
    <Page>
      <H1>All Recipes</H1>

      {user ? (
        <Link to="/recipes/">My Recipes</Link>
      ) : (
        <a href="#" onClick={() => login()}>
          My Recipes
        </a>
      )}

      <RecipeList recipes={recipes} match={match} />

      <Route
        path={`${match.path}:id`}
        render={props => <ModalRecipe {...props} collection={"original"} />}
      />
    </Page>
  );
}
