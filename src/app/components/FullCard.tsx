import * as React from "react";
import { useState, useContext } from "react";
import { userContext } from "../context/UserContext";
import { db } from "../services/Firebase";
import { Page } from "./styled/Page";
import uuidv4 = require('uuid/v4');
// import console = require("console");

export default function FullCard() {
  const [recipes, setRecipes] = useState([]);
  const [user] = useContext(userContext);

  console.log('context', user)

  
    const myRecipeRef = db.collection('recipes');
    const query = myRecipeRef.where("OwnerUid", "==", user.uid);
  
    React.useEffect(() => {
      query.get().then(snap => {
        let list: any = []
        snap.forEach(recipe => {
          list = [...list, recipe.data()]
        })
        setRecipes(list);
      });
    }, []);
  



  console.log('recipes', recipes)
  if (recipes.length === 0) return (<Page>loading</Page>);

  return (
    <Page>
      <h1>Full Recipe</h1>
      <ul>
        {recipes.map((recipe: { recipeName: string; }) => <li key={uuidv4()}>{recipe.recipeName}</li>)}
      </ul>

    </Page>
  );
};
