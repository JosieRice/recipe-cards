import * as React from "react";
import { useState, useEffect } from "react";
import { db } from "../services/Firebase";

// Style
import { Modal, RecipeCard } from "./styled/Page";
import { Ingredients, Instructions, Description } from "./styled/RecipeCard";

// @ts-ignore
export default function FullCard({ match, history }) {
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

  const listIngredients = recipe && recipe.ingredients.map((ingredient: any, index: number) =>
    <li key={index}>{ingredient}</li>
  );

  const listPrep = recipe && recipe.prepInstructions.map((instructions: any, index: number) =>
    <li key={index}>{instructions}</li>
  )

  const listCookInstructions = recipe && recipe.cookInstructions.map((instructions: any, index: number) =>
    <li key={index}>{instructions}</li>
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

  if (!recipe) return (<div>loading</div>);

  return (
    <Modal>
      <button style={{ position: 'absolute', right: '15px', top: '15px' }} onClick={back}>X</button>
      <RecipeCard id={match.params.id}>

        <div style={{ margin: '0 0 10px 0' }}>
          <h1 style={{ margin: '0 0 5px 0', fontSize: '4vmin' }}>{recipe.recipeName}</h1>
          <Description>{recipe.description}</Description>
        </div>

        <div style={{ margin: "10px 0" }}>
          Prep Time: {recipe.prepTime}
          Cook Time: {recipe.cookTime}
        </div>

        <div style={{ display: 'flex' }}>
          <Ingredients>
            Ingredients: <ul>{listIngredients}</ul>
          </Ingredients>

          <Instructions>
            Prep Instructions: <ol>{listPrep}</ol><br /><br />
            Cooking Instructions: <ol>{listCookInstructions}</ol>
          </Instructions>
        </div>

        <button onClick={fullScreen}>Cook now</button>

      </RecipeCard>
    </Modal>
  );
};
