import * as React from "react";
import { useState, useEffect } from "react";
import { db } from "../services/Firebase";

// Style
import { Modal, RecipeCard } from "./styled/Page";
import { Ingredients, Instructions, Description } from "./styled/RecipeCard";

// @ts-ignore
export default function ModalRecipe({ match, history }) {
  const [recipe, setRecipe] = useState();

  const [recipeName, setRecipeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [prepTime, setPrepTime] = useState<string>("");
  const [cookTime, setCookTime] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [prepInstructions, setPrepInstructions] = useState<string[]>([])
  const [cookInstructions, setCookInstructions] = useState<string[]>([])

  const myRecipeRef = db.collection('recipes');
  const query = myRecipeRef.doc(match.params.id)

  useEffect(() => {
    query.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        const data = doc.data()

        setRecipe(doc.data());
        setRecipeName(data.recipeName);
        setDescription(data.description);
        setPrepTime(data.prepTime);
        setCookTime(data.cookTime);
        setIngredients(data.ingredients);
        setPrepInstructions(data.prepInstructions);
        setCookInstructions(data.cookInstructions);

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }, []);


  const handleArrayChange = (index: number, array: any, ingredient: string, cb: any) => {
    console.log('index', index)
    console.log('ingred', ingredient)
    let newList = [...array]
    newList[index] = ingredient
    console.log('newList', newList)
    cb(newList)
  }

  const listIngredients = recipe && ingredients.map((ingredient: any, index: number) =>
    <li key={index}>
      <input
        value={ingredient}
        onChange={e => handleArrayChange(index, ingredients, e.target.value, setIngredients)}
      />
    </li>
  );

  const listPrep = recipe && prepInstructions.map((prepInstruction: any, index: number) =>
    <li key={index}>
    <input
      value={prepInstruction}
      onChange={e => handleArrayChange(index, prepInstructions, e.target.value, setPrepInstructions)}
    />
    </li>
  )

  const listCookInstructions = recipe && cookInstructions.map((cookInstruction: any, index: number) =>
    <li key={index}>
      <input
        value={cookInstruction}
        onChange={e => handleArrayChange(index, cookInstructions, e.target.value, setCookInstructions)}
      />
    </li>
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
          <input
            style={{ margin: '0 0 5px 0', fontSize: '4vmin', border: 'none' }}
            value={recipeName}
            onChange={e => setRecipeName(e.target.value)}
          />
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div style={{ margin: "10px 0" }}>
          Prep Time:
          <input
            value={prepTime}
            onChange={e => setPrepTime(e.target.value)}
          />
          Cook Time:
          <input
            value={cookTime}
            onChange={e => setCookTime(e.target.value)}
          />
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
