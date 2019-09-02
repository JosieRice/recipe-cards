import * as React from "react";
import { Page, H1 } from "../components/styled/Page";
import { db } from "../services/Firebase";
import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import ModalRecipe from "./ModalRecipe";
import Loading from "../components/Loading";
import RecipeList from "../components/RecipeList";
import { useToasts } from 'react-toast-notifications';
import { toastError } from "../utilites/Settings";

export default function AllRecipes({ match }: any) {
  const [recipes, setRecipes] = useState([]);

  const { addToast } = useToasts();

  useEffect(() => {
    db
      .collection('original')
      // .limit(5)   // use this limit for pagination or infinite scroll
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
        addToast(`Unable to load recipes because ${error}, try again later`, toastError)
        console.error("Error adding document: ", error);
      });
  }, []);

  if (recipes.length === 0) return <Loading />;

  return (
    <Page>
      <H1>Browse Recipes</H1>

      <RecipeList
        recipes={recipes}
        match={match}
      />

      <Route
        path={`${match.path}:id`}
        render={(props) => <ModalRecipe {...props} collection={'original'} />}
      />

    </Page>
  );
};