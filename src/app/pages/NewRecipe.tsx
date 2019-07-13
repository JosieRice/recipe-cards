import * as React from "react";
import { useState, useContext, FormEvent } from "react";
import { db } from "../services/Firebase";
import { userContext } from "../context/UserContext";
import { isEmpty, strToArr } from "../utilites/Utilities";
import { Page, H1, Label, Input, TextArea } from "../components/styled/Page";

import { useToasts } from 'react-toast-notifications';

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

  const { addToast } = useToasts()

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
        addToast('Recipe Saved', { appearance: 'info', autoDismiss: true,
        pauseOnHover: true })  
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        addToast(`Unable to save because ${error}, try again later`, { appearance: 'error', autoDismiss: true, pauseOnHover: true })
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

  if (isEmpty(user)) return <Page>Login to See</Page>;

  return (
    <Page>
      <H1>New Recipe</H1>
      <form onSubmit={handleSubmit} id="recipeForm">

        <Label>Recipe Name</Label>
        <Input
          type="text"
          name="recipeName"
          placeholder=""
          value={recipeName}
          onChange={e => setRecipeName(e.target.value)}
        />


        <br />

        <Label>Description:</Label>
        <Input
          type="text"
          name="description"
          placeholder=""
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <br />

        <Label>Prep Time:</Label>
        <Input
          type="text"
          name="prepTime"
          placeholder=""
          value={prepTime}
          onChange={e => setPrepTime(e.target.value)}
        />
        <br />

        <Label>Cook Time:</Label>
        <Input
          type="text"
          name="cookTime"
          placeholder=""
          value={cookTime}
          onChange={e => setCookTime(e.target.value)}
        />
        <br />

        <Label>Recipe Source:</Label>
        <Input
          type="text"
          name="sourceUrl"
          placeholder=""
          value={sourceUrl}
          onChange={e => setSourceUrl(e.target.value)}
        />
        <br />

        <br /><br />

        <Label>Ingredients:</Label>
        <TextArea
          form="recipeForm"
          rows={20}
          cols={33}
          name="currentItem"
          placeholder=""
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
        />
        <br />

        <Label>Prep Instructions:</Label>
        <TextArea
          form="recipeForm"
          rows={20}
          cols={33}
          name="prepInstructions"
          placeholder=""
          value={prepInstructions}
          onChange={e => setPrepInstructions(e.target.value)}
        />
        <br />

        <Label>Cooking Instructions:</Label>
        <TextArea
          form="recipeForm"
          rows={20}
          cols={33}
          name="cookInstructions"
          placeholder=""
          value={cookInstructions}
          onChange={e => setCookInstructions(e.target.value)}
        />


        <br /><br />

        <button>Add Recipe</button>
      </form>
    </Page>
  );
};