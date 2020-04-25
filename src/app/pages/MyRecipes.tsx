import * as React from "react";
import { useContext } from "react";
import { Route, Link } from "react-router-dom";

import { Page, H1 } from "../components/styled/Page";
import { userContext } from "../context/UserContext";
import ModalRecipe from "./ModalRecipe";
import { isEmpty } from "../utilites/Utilities";
import Loading from "../components/Loading";
import RecipeList from "../components/RecipeList";
import { NotLoggedIn } from "../components/LoginLogout";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const RECIPES = gql`
  query getRecipes($collection: String!) {
    recipes(collection: $collection) {
      id
      imageUrl
      recipeName
    }
  }
`;

export default function MyRecipes({ match }: any) {
  const [user] = useContext(userContext);
  const { loading, error, data } = useQuery(RECIPES, {
    variables: { collection: user.uid }
  });

  if (loading) return <Loading />;
  if (error) return <div>error</div>;

  const { recipes } = data;

  if (isEmpty(user)) return <NotLoggedIn />;

  return (
    <Page>
      <H1>My Recipes</H1>

      <Link to="/">All Recipes</Link>

      <RecipeList recipes={recipes} match={match} />

      <Route
        path={`${match.path}:id`}
        render={props => <ModalRecipe {...props} collection={user.uid} />}
      />
    </Page>
  );
}
