import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { Route } from 'react-router-dom';

import { Page, H1 } from "../components/styled/Page";
import { db } from "../services/Firebase";
import { userContext } from "../context/UserContext";
import ModalRecipe from "./ModalRecipe";
import { isEmpty } from "../utilites/Utilities";
import Loading from "../components/Loading";
import RecipeList from "../components/RecipeList";
import { NotLoggedIn } from "../components/LoginLogout";
import { toastError } from "../utilites/Settings";
import { useToasts } from 'react-toast-notifications';

export default function MyRecipes({ match }: any) {
  const [recipes, setRecipes] = useState([]);
  const [user] = useContext(userContext);

  const { addToast } = useToasts();

  if (isEmpty(user)) return (<NotLoggedIn />);

  useEffect(() => {
    db
      .collection('recipes')
      .where("OwnerUid", "==", user.uid) // my recipes
      .get()
      .then(snap => {
        let list: any = []
        snap.forEach(recipe => {
          // Adds recipe id's onto the recipe object
          let recipeObj = recipe.data()
          recipeObj['id'] = recipe.id

          list = [...list, recipeObj]
        })
        setRecipes(list);
      })
      .catch(function (error) {
        addToast(`Unable to save because ${error}, try again later`, toastError)
        console.error("Error adding document: ", error);
      });
  }, []);

  if (recipes.length === 0) return (<Loading />);

  return (
    <Page>
      <H1>My Recipes</H1>

      <RecipeList
        recipes={recipes}
        match={match}
      />

      <Route path={`${match.path}:id`} component={ModalRecipe} />

    </Page>
  );
};