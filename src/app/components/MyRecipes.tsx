import * as React from "react";
import { Page } from "./styled/Page";
import { db } from "../services/Firebase";
import { useState, useEffect, useContext } from "react";
import uuidv4 = require('uuid/v4');
import { userContext } from "../context/UserContext";


export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [user] = useContext(userContext);

  const myRecipeRef = db.collection('recipes');
  const query = myRecipeRef.where("OwnerUid", "==", user.uid);


  console.log('uid', user.uid)

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