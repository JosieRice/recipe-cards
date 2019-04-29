import * as React from "react";
import { useState, FormEvent } from "react";
import { dataBase } from "../services/Firebase";

export default function NewRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [ingredient, setIngredient] = useState("");

  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dataBase
      .collection("recipes")
      .add({
        recipeName: recipeName,
        ingredient: ingredient
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        setRecipeName("");
        setIngredient("");
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });

    // console.log('hit submit')
    // alert('hi')

    // @ts-ignore
    // const itemsRef = firebase.database().ref("items");
    // const item = {
    //   recipeName: recipeName,
    //   ingredient: ingredient
    // };
    // itemsRef.push(item);
    // this.setState({
    //   currentItem: '',
    //   username: ''
    // });
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
}
