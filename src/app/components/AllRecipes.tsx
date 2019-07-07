import * as React from "react";
import { Page, H1, LI } from "./styled/Page";
import { db } from "../services/Firebase";
import { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import ModalRecipe from "./ModalRecipe";

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

  if (recipes.length === 0) return (<Page>loading</Page>);

  {console.log('recipes', recipes)}
  
  return (  
    <Page>
      <H1>All Recipes</H1>
      <ul>
        {recipes.map((recipe: { recipeName: string; id: string }, index: number) =>
          <LI key={index}>
            <Link to={`${match.path}${recipe.id}`}>
              {recipe.recipeName}
            </Link>
          </LI>
        )}
      </ul>
      <Route path={`${match.path}:id`} component={ModalRecipe} />

    </Page>
  );
};