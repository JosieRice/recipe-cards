import * as React from "react";
import { useState, useContext, FormEvent } from "react";
import { db } from "../services/Firebase";
import { userContext } from "../context/UserContext";
import { strToArr, getRecipeDetails, arrToStr } from "../utilites/Utilities";
import { Page, H1, Label, Input, TextArea } from "../components/styled/Page";

import { useToasts } from 'react-toast-notifications';
import { toastInfo, toastError } from "../utilites/Settings";
import { UploadRecipePic } from "../utilites/FileUploader";

export default function NewRecipe() {
  const [recipeName, setRecipeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [prepTime, setPrepTime] = useState<string>("");
  const [cookTime, setCookTime] = useState<string>("");
  const [sourceUrl, setSourceUrl] = useState<string>("");
  const [sourceType, setSourceType] = useState<string>("");
  const [prepInstructions, setPrepInstructions] = useState<string>("");
  const [cookInstructions, setCookInstructions] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");

  const [user] = useContext(userContext);

  const { addToast } = useToasts();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const prepInstructionsArr = strToArr(prepInstructions);
    const cookInstructionsArr = strToArr(cookInstructions);
    const ingredientsArr = strToArr(ingredients);

    const batch = db.batch();

    const originalRecipe = {
      recipeName,
      description,
      imageUrl,
      prepTime,
      cookTime,
      sourceUrl,
      sourceType,
      prepInstructions: prepInstructionsArr,
      cookInstructions: cookInstructionsArr,
      ingredients: ingredientsArr,
      displayName: user.displayName,
      creatorUid: user.uid,
      dateCreated: Date.now()
    };

    const editableRecipe = { ...originalRecipe, ownerUid: user.uid };

    const original = db.collection("original").doc();
    batch.set(original, { ...originalRecipe, ...{ originalID: original.id } });

    const editable = db.collection(user.uid).doc();
    batch.set(editable, { ...editableRecipe, ...{ originalID: original.id } });

    const copyTrackingData = {
      recipeVariations: [
        {
          collection: 'original',
          document: original.id,
          lastUpdated: originalRecipe.dateCreated
        },
        {
          collection: user.uid,
          document: editable.id,
          lastUpdated: originalRecipe.dateCreated
        }
      ]
    };

    const copyTracking = db.collection("copy-tracking").doc(original.id);
    batch.set(copyTracking, copyTrackingData);

    // Commit the batch
    batch.commit()
      .then(function () {
        addToast('Recipe Saved', toastInfo)
      })
      .then(function () {
        setRecipeName("");
        setDescription("");
        setImageUrl("");
        setPrepTime("");
        setCookTime("");
        setSourceUrl("");
        setPrepInstructions("");
        setCookInstructions("");
        setIngredients("");
      })
      .catch(function (error) {
        addToast(`Unable to save original because ${error}, try again later`, toastError)
        console.error("Error adding document: ", error);
      });
  };

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

        <UploadRecipePic
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
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

        <select onChange={(e) => {
          setSourceType(e.target.value)
        }}>
          <option value="">--Please choose an option--</option>
          <option value="web">Web Site</option>
          <option value="book">Cook Book</option>
          <option value="family">Family Recipe</option>
          <option value="unknown">Not Sure</option>
        </select>

        <button type="button" onClick={async () => {
          const res = await getRecipeDetails(sourceUrl);
          setSourceType("web")
          res.title && setRecipeName(res.title);
          res.description && setDescription(res.description);
          res.prepTime && setPrepTime(res.prepTime)
          res.cookTime && setCookTime(res.cookTime)
          res.ingredients && setIngredients(arrToStr(res.ingredients));
          res.instructions && setCookInstructions(arrToStr(res.instructions));
        }}>beta web scraper</button>

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