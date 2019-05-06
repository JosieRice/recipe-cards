import * as React from "react";
import { Page } from "./styled/Page";
import { db } from "../services/Firebase";
import { useState, useEffect } from "react";
import uuidv4 = require('uuid/v4');

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);

  const myRecipeRef = db.collection('recipes');
  // query for all recipes in all uid's
  const query = myRecipeRef.where("uid", ">", "0");

  useEffect(() => {
    query.get().then(snap => {
      let list: any = []
      snap.forEach(recipe => {
        list = [...list, recipe.data()]
      })
      setRecipes(list);
    });
  }, []);

  console.log('recipes', recipes)
  if (recipes.length === 0) return (<Page>loading</Page>);

  return (
    <Page>
      <h1>My Recipes</h1>
      <ul>
        {recipes.map((recipe: { recipeName: string; }) => <li key={uuidv4()}>{recipe.recipeName}</li>)}
      </ul>

    </Page>
  );
};