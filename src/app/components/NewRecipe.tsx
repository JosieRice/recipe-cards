import * as React from "react";
import { useState, useContext, FormEvent } from "react";
import { dataBase } from "../services/Firebase";
import { userContext } from "../context/UserContext";
import { isEmpty } from "../utilites/Utilities";
// import console = require("console");
// import console = require("console");

const NewRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredient, setIngredient] = useState("");
  const context = useContext(userContext);

  console.log('context', context)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dataBase
      .collection("recipes")
      .add({
        recipeName: recipeName,
        ingredient: ingredient
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

  // if (isEmpty(context.user)) return <div>not signed in</div>;


  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* {context.user.user.displayName} */}
        <input
          type="text"
          name="username"
          placeholder="Recipe Name"
          value={recipeName}
          onChange={e => setRecipeName(e.target.value)}
        // required
        />
        <input
          type="text"
          name="currentItem"
          placeholder="Ingredients"
          value={ingredient}
          onChange={e => setIngredient(e.target.value)}
        // required
        />
        <button>Add Recipe</button>
      </form>
    </div>
  );
};

export default NewRecipe;
