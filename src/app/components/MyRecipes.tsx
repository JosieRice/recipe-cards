import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { Route, Link } from 'react-router-dom'

import { Page } from "./styled/Page";
import { db } from "../services/Firebase";
import uuidv4 = require('uuid/v4');
import { userContext } from "../context/UserContext";
import FullCard from "./FullCard";

export default function MyRecipes({ match }: any) {
  const [recipes, setRecipes] = useState([]);
  const [user] = useContext(userContext);

  const myRecipeRef = db.collection('recipes');
  const query = myRecipeRef.where("OwnerUid", "==", user.uid);

  useEffect(() => {
    query.get().then(snap => {
      let list: any = []
      snap.forEach(recipe => {
        let recipeObj = recipe.data()
        recipeObj['id'] = recipe.id

        list = [...list, recipeObj]
      })
      setRecipes(list);
    });
  }, []);

  if (recipes.length === 0) return (<Page>loading</Page>);

  return (
    <Page>
      <h1>My Recipes</h1>
      <ul>
        {recipes.map((recipe: { recipeName: string; id: string; }) =>
          <li key={uuidv4()}>
            <Link to={`${match.path}${recipe.id}`}>
              {recipe.recipeName}
            </Link> 
          </li>)
        }
      </ul>
      <Route path={`${match.path}:id`} component={FullCard} />

    </Page>
  );
};