import * as React from "react";
import { useState, useEffect } from "react";
import { db } from "../services/Firebase";
import { Page } from "./styled/Page";
import uuidv4 = require('uuid/v4');

// @ts-ignore
export default function FullCard({ match }) {
  const [recipe, setRecipe] = useState();

  const myRecipeRef = db.collection('recipes');
  const query = myRecipeRef.doc(match.params.id)

  useEffect(() => {
    query.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());

        setRecipe(doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }, []);

  const listIngredients = recipe && recipe.ingredients.map((ingredient: any) =>
    <li key={uuidv4()}>{ingredient}</li>
  );

  const listPrep = recipe && recipe.prepInstructions.map((instructions: any) =>
    <li key={uuidv4()}>{instructions}</li>
  )

  const listCookInstructions = recipe && recipe.cookInstructions.map((instructions: any) =>
  <li key={uuidv4()}>{instructions}</li>
)

  console.log('recipe', recipe)
  if (!recipe) return (<Page>loading</Page>);

  return (
    <Page>
      <h1>Full Recipe</h1>

      Recipe Name: {recipe.recipeName}<br /><br />
      Description: {recipe.description}<br /><br />
      Prep Time: {recipe.prepTime}<br /><br />
      Cook Time: {recipe.cookTime}<br /><br />
      Ingredients: <ul>{listIngredients}</ul><br /><br />
      Prep Instructions: <ul>{listPrep}</ul><br /><br />
      Cooking Instructions: <ul>{listCookInstructions}</ul><br /><br />

    </Page>
  );
};
