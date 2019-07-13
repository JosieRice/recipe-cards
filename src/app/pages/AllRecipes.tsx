import * as React from "react";
import { Page, H1 } from "../components/styled/Page";
import { db } from "../services/Firebase";
import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import ModalRecipe from "../components/ModalRecipe";
import Loading from "../components/Loading";
import RecipeList from "../components/RecipeList";

export default function AllRecipes({ match }: any) {
  const [recipes, setRecipes] = useState([]);

  const myRecipeRef = db.collection('recipes');
  // query for all recipes in all uid's
  const query = myRecipeRef.where("OwnerUid", ">", "0");

  useEffect(() => {
    query.get().then(snap => {
      let list: any = []
      snap.forEach(recipe => {
        // Adds recipe id's onto the recipe object
        let recipeObj = recipe.data()
        recipeObj['id'] = recipe.id

        list = [...list, recipeObj]
      })
      setRecipes(list);
    });
  }, []);

  if (recipes.length === 0) return <Loading />;

  return (
    <Page>
      <H1>All Recipes</H1>

      <RecipeList
        recipes={recipes}
        match={match}
      />

      <Route path={`${match.path}:id`} component={ModalRecipe} />

    </Page>
  );
};