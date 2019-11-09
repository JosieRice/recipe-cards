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
import gql from "graphql-tag";

const RECIPES = gql`
  query getRecipes($collection: String!) {
    recipes(collection: $collection) {
      id
      imageUrl
      recipeName
    }
  }
`;

export default function Index({ match }: any) {
  const [user, setUser] = useContext(userContext);
  const { loading, error, data } = useQuery(RECIPES, {
    variables: { collection: "original" }
  });

  if (loading) return <Loading />;
  if (error) return <div>error</div>;

  const { recipes } = data;

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
