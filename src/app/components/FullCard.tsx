import * as React from "react";
import { useState, useEffect } from "react";
import { db } from "../services/Firebase";
import { Page } from "./styled/Page";
import uuidv4 = require('uuid/v4');

// @ts-ignore
export default function FullCard({ match, history }) {
  console.log('full card')
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

  const back = (e: any) => {
    e.stopPropagation();
    history.goBack();
  };

  const fullScreen = () => {
    const elem = document.getElementById(match.params.id);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }

  console.log('recipe', recipe)
  if (!recipe) return (<Page>loading</Page>);

  return (
    // <div
    //   onClick={back}
    //   style={{
    //     position: "absolute",
    //     top: 0,
    //     left: 0,
    //     bottom: 0,
    //     right: 0,
    //     background: "rgba(0, 0, 0, 0.15)"
    //   }}
    // >
      <div
        className="modal"
        style={{
          position: "absolute",
          background: "#fff",
          top: 25,
          left: "10%",
          right: "10%",
          padding: 15,
          border: "2px solid #444"
        }}
      >
      <button onClick={back}>Back</button>
        <Page id={match.params.id}>
          <h1>Full Recipe</h1>

          Recipe Name: {recipe.recipeName}<br /><br />
          Description: {recipe.description}<br /><br />
          Prep Time: {recipe.prepTime}<br /><br />
          Cook Time: {recipe.cookTime}<br /><br />
          Ingredients: <ul>{listIngredients}</ul><br /><br />
          Prep Instructions: <ul>{listPrep}</ul><br /><br />
          Cooking Instructions: <ul>{listCookInstructions}</ul><br /><br />

          <button onClick={fullScreen}>Cook now</button>

        </Page>
      </div>
    // </div>
  );
};
