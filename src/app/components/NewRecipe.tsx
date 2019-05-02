import * as React from "react";
import { useState, useContext, FormEvent } from "react";
import { dataBase } from "../services/Firebase";
import { userContext } from "../context/UserContext";
import { isEmpty } from "../utilites/Utilities";

interface IProps {
  // ... props interface 
}

const NewRecipe: React.FC<IProps> = () => {
  const [recipeName, setRecipeName] = useState<string>("");
  const [ingredient, setIngredient] = useState<string>("");
  const context = useContext(userContext);

  console.log('context', context)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dataBase
      .collection("recipes")
      .add({
        recipeName,
        ingredient,
        creator: context.user.user.displayName,
        userUID: context.user.user.uid

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
    <div>
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
          name="currentItem"
          placeholder="Ingredients"
          value={ingredient}
          onChange={e => setIngredient(e.target.value)}
        />
        <button>Add Recipe</button>
      </form>
    </div>
  );
};

export default NewRecipe;