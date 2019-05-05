import * as React from "react";
import { useState, useContext, FormEvent } from "react";
import { db } from "../services/Firebase";
import { userContext } from "../context/UserContext";
import { isEmpty } from "../utilites/Utilities";
import { Page } from "./styled/Page";

export default function NewRecipe() {
  const [recipeName, setRecipeName] = useState<string>("");
  const [instructions, setInstructions] = useState<any>("");
  const [ingredient, setIngredient] = useState<string>("");

  const context = useContext(userContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    db
      .collection(`recipes`)
      .add({
        recipeName,
        instructions,
        ingredients: [],
        uid: context.user.uid,
        displayName: context.user.displayName,
        original: true,
        creatorUid: context.user.uid,
        dateCreated: Date.now()
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        setRecipeName("");
        setIngredient("");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  if (isEmpty(context.user)) return <div>not signed in</div>;

  return (
    <Page>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="username"
          placeholder="Recipe Name"
          value={recipeName}
          onChange={e => setRecipeName(e.target.value)}
        />

        <input
          type="text"
          name="Instructions"
          placeholder="Instructions"
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
        />

        <input
          type="text"
          name="currentItem"
          placeholder="Ingredients"
          value={ingredient}
          onChange={e => setIngredient(e.target.value)}
        />

        <button>Add Recipe</button>
      </form>
    </Page>
  );
};