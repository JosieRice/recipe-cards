import * as React from "react";
import { Page, H1 } from "./styled/Page";
import { db } from "../services/Firebase";
import { useState, useEffect } from "react";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);

  const myRecipeRef = db.collection('recipes');
  // query for all recipes in all uid's
  const query = myRecipeRef.where("OwnerUid", ">", "0");

  useEffect(() => {
    query.get().then(snap => {
      let list: any = []
      snap.forEach(recipe => {
        list = [...list, recipe.data()]
      })
      setRecipes(list);
    });
  }, []);

  if (recipes.length === 0) return (<Page>loading</Page>);

  return (
    <Page>
      <H1>All Recipes</H1>
      <ul>
        {recipes.map((recipe: { recipeName: string; }, index: number) => <li key={index}>{recipe.recipeName}</li>)}
      </ul>

    </Page>
  );
};