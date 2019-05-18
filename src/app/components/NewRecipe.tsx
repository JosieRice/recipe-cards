import * as React from "react";
import { useState, useContext, FormEvent } from "react";
import { db } from "../services/Firebase";
import { userContext } from "../context/UserContext";
import { isEmpty, strToArr } from "../utilites/Utilities";
import { Page } from "./styled/Page";

export default function NewRecipe() {
  const [recipeName, setRecipeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [prepTime, setPrepTime] = useState<string>("");
  const [cookTime, setCookTime] = useState<string>("");
  const [sourceUrl, setSourceUrl] = useState<string>("");
  const [prepInstructions, setPrepInstructions] = useState<string>("");
  const [cookInstructions, setCookInstructions] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");

  const [user] = useContext(userContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const prepInstructionsArr = strToArr(prepInstructions);
    const cookInstructionsArr = strToArr(cookInstructions);
    const ingredientsArr = strToArr(ingredients);

    // Create Original Recipe
    db
      .collection(`recipes`)
      .add({
        recipeName,
        description,
        prepTime,
        cookTime,
        sourceUrl,
        prepInstructions: prepInstructionsArr,
        cookInstructions: cookInstructionsArr,
        ingredients: ingredientsArr,
        displayName: user.displayName,
        original: true,
        originalCreatorUid: user.uid,
        creatorUid: user.uid,
        dateCreated: Date.now()
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        // setRecipeName("");
        // setDescription("");
        // setPrepTime("");
        // setCookTime("");
        // setPrepInstructions("");
        // setCookInstructions("");
        // setIngredients("");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

      // Create your editable copy
      db
      .collection(`recipes`)
      .add({
        recipeName,
        description,
        prepTime,
        cookTime,
        sourceUrl,
        prepInstructions: prepInstructionsArr,
        cookInstructions: cookInstructionsArr,
        ingredients: ingredientsArr,
        OwnerUid: user.uid,
        displayName: user.displayName,
        original: false,
        creatorUid: user.uid,
        dateCreated: Date.now()
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        setRecipeName("");
        setDescription("");
        setPrepTime("");
        setCookTime("");
        setPrepInstructions("");
        setCookInstructions("");
        setIngredients("");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

  };

  if (isEmpty(user)) return <div>not signed in</div>;

  return (
    <Page>
      <form onSubmit={handleSubmit} id="recipeForm">

        <input
          type="text"
          name="recipeName"
          placeholder="Recipe Name"
          value={recipeName}
          onChange={e => setRecipeName(e.target.value)}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <input
          type="text"
          name="prepTime"
          placeholder="Prep Time"
          value={prepTime}
          onChange={e => setPrepTime(e.target.value)}
        />

        <input
          type="text"
          name="cookTime"
          placeholder="Cooking Time"
          value={cookTime}
          onChange={e => setCookTime(e.target.value)}
        />

         <input
          type="text"
          name="sourceUrl"
          placeholder="Recipe Source"
          value={sourceUrl}
          onChange={e => setSourceUrl(e.target.value)}
        /><br /><br />

        <textarea
          form="recipeForm"
          rows={20}
          cols={33}
          name="prepInstructions"
          placeholder="Prep Instructions"
          value={prepInstructions}
          onChange={e => setPrepInstructions(e.target.value)}
        />

        <textarea
          form="recipeForm"
          rows={20}
          cols={33}
          name="cookInstructions"
          placeholder="Cooking Instructions"
          value={cookInstructions}
          onChange={e => setCookInstructions(e.target.value)}
        />

        <textarea
          form="recipeForm"
          rows={20}
          cols={33}
          name="currentItem"
          placeholder="Ingredients"
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
        /><br /><br />

        <button>Add Recipe</button>
      </form>
    </Page>
  );
};