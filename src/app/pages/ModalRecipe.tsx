import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { db } from "../services/Firebase";
import { useToasts } from 'react-toast-notifications';

// Style
import { RecipeCard } from "../components/styled/Page";
import { Modal, Time, Instructions, Label } from "../components/styled/Modal";
import { userContext } from "../context/UserContext";
import { DragDropContext } from "react-beautiful-dnd";
import { DragResult } from "../types/Globals";
import Loading from "../components/Loading";
import Name from "../components/modalComponents/Name";
import Description from "../components/modalComponents/Description";
import List from "../components/modalComponents/List";

// @ts-ignore
export default function ModalRecipe({ match, history }) {
  const [recipe, setRecipe] = useState();

  const [recipeName, setRecipeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [prepTime, setPrepTime] = useState<string>("");
  const [cookTime, setCookTime] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [prepInstructions, setPrepInstructions] = useState<string[]>([]);
  const [cookInstructions, setCookInstructions] = useState<string[]>([]);
  const [recipeID, setRecipeID] = useState<string>("");
  const [sourceUrl, setSourceUrl] = useState<string>("");

  const [update, setUpdate] = useState<boolean>(false)
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [reorder, setReorder] = useState<boolean>(false);

  const [user] = useContext(userContext);

  const myRecipeRef = db.collection('recipes');
  const query = myRecipeRef.doc(match.params.id);


  useEffect(() => {

    document.addEventListener('fullscreenchange', exitHandler);
    // document.addEventListener('webkitfullscreenchange', exitHandler);
    // document.addEventListener('mozfullscreenchange', exitHandler);
    // document.addEventListener('MSFullscreenChange', exitHandler);

    query.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        setRecipeID(doc.id);
        const data = doc.data()

        setRecipe(data);
        setRecipeName(data.recipeName);
        setDescription(data.description);
        setPrepTime(data.prepTime);
        setCookTime(data.cookTime);
        setIngredients(data.ingredients);
        setPrepInstructions(data.prepInstructions);
        setCookInstructions(data.cookInstructions);
        setSourceUrl(data.sourceUrl);

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }, []);

  const { addToast } = useToasts();

  const onDragEnd = (result: DragResult) => {
    const { destination, source, draggableId } = result;
    const sameListSameSpot = destination.droppableId === source.droppableId && destination.index === source.index;
    const differentList = source.droppableId !== destination.droppableId

    if (!destination) {
      return;
    }

    if (sameListSameSpot) {
      return;
    }

    if (differentList) {
      return;
    }

    let newArr = Array.from(ingredients)
    newArr.splice(source.index, 1);
    newArr.splice(destination.index, 0, ingredients[parseInt(draggableId)]);

    setIngredients(newArr);
    setUpdate(true);
  }

  const exitHandler = () => {
    if (!document.fullscreenElement) {
      setFullscreen(false)
    }
  }

  const handleArrayChange = (index: number, array: any, ingredient: string, cb: any) => {
    let newList = [...array]
    newList[index] = ingredient

    cb(newList);
    setUpdate(true);
  }

  const back = (e: any) => {
    e.stopPropagation();
    if (update) handleUpdate(e);
    history.goBack();
  };

  const startFullScreen = () => {
    const elem = document.getElementById(match.params.id);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
    setFullscreen(true)
  }

  const copyRecipe = (e: any) => {
    e.preventDefault();
    console.log('copy recipe')

    db
      .collection(`recipes`)
      .add({
        recipeName,
        description,
        prepTime,
        cookTime,
        prepInstructions,
        cookInstructions,
        ingredients,
        OwnerUid: user.uid,
        displayName: user.displayName,
        original: false,
        sourceUrl,
        creatorUid: recipe.creatorUid,
        dateUpdated: Date.now()
      })
      .then(function () {
        addToast('Recipe Copied into your recipes.', {
          appearance: 'info', autoDismiss: true,
          pauseOnHover: true
        })
        setUpdate(false);
        console.log("Document updated");
      })
      .catch(function (error) {
        // TODO: add feeback that it didn't save.
        addToast(`Unable to copy recipe because ${error}, try again later`, { appearance: 'error', autoDismiss: true, pauseOnHover: true })
        console.error("Error adding document: ", error);
      });
  }

  const handleUpdate = (e: any) => {
    e.preventDefault();
    console.log('handle update')

    if (user.uid !== recipe.OwnerUid) {
      copyRecipe(e)
      console.log('copied recipe')
      return
    }

    db
      .collection(`recipes`)
      .doc(recipeID).update({
        recipeName,
        description,
        prepTime,
        cookTime,
        prepInstructions,
        cookInstructions,
        ingredients,
        OwnerUid: user.uid,
        displayName: user.displayName,
        original: false,
        sourceUrl,
        dateUpdated: Date.now()
      })
      .then(function () {
        // TODO: add feedback that it's been saved, use third arguement of optional cb to close modal
        addToast('Updated Successfully', {
          appearance: 'info', autoDismiss: true,
          pauseOnHover: true
        })
        setUpdate(false);
        console.log("Document updated");
      })
      .catch(function (error) {
        // TODO: add feeback that it didn't save.
        addToast(`Unable to Update because ${error}, try again later`, { appearance: 'error', autoDismiss: true, pauseOnHover: true })
        console.error("Error adding document: ", error);
      });
  }

  if (!recipe) return (<Loading />);

  return (
    <Modal>
      <button style={{ position: 'absolute', right: '15px', top: '15px' }} onClick={back}>X</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <RecipeCard id={match.params.id}>

          <div style={{ margin: '0 0 10px 0' }}>

            <Name
              fullscreen={fullscreen}
              value={recipeName}
              setValue={setRecipeName}
              setUpdate={setUpdate}
            />

            <Description
              fullscreen={fullscreen}
              value={description}
              setValue={setDescription}
              setUpdate={setUpdate}
            />

          </div>

          <div style={{ display: 'flex', width: "100%" }}>

            <List
              recipe={recipe}
              array={ingredients}
              setArray={setIngredients}
              fullscreen={fullscreen}
              onChange={handleArrayChange}
            />

            <Instructions>
              <Label>Prep Time: </Label>
              <Time
                disabled={fullscreen || !user}
                value={prepTime}
                onChange={e => {
                  setPrepTime(e.target.value)
                  setUpdate(true)
                }
                }
              />
              <List
                recipe={recipe}
                array={prepInstructions}
                setArray={setPrepInstructions}
                fullscreen={fullscreen}
                onChange={handleArrayChange}
              />

              <button onClick={() => setPrepInstructions([...prepInstructions, ""])}>+</button>
              <br />
              <Label>Cook Time: </Label>
              <Time
                disabled={fullscreen || !user}
                value={cookTime}
                onChange={e => {
                  setCookTime(e.target.value)
                  setUpdate(true)
                }}
              />

              <List
                recipe={recipe}
                array={cookInstructions}
                setArray={setCookInstructions}
                fullscreen={fullscreen}
                onChange={handleArrayChange}
              />

              <button onClick={() => setCookInstructions([...cookInstructions, ""])}>+</button>
            </Instructions>
          </div>

          {/* BUTTON TOWN */}

          {reorder ? <button onClick={() => setReorder(false)}>turn reorder off</button> : <button onClick={() => setReorder(true)}>turn reorder on</button>}

          {user && user.uid !== recipe.OwnerUid && <button onClick={copyRecipe}>Add to my recipes</button>}

          {update && <button onClick={handleUpdate}>update</button>}

          {!fullscreen && <a href={sourceUrl} target="_blank">Original Source</a>}

          {!fullscreen && <button onClick={startFullScreen}>Cook now</button>}

        </RecipeCard>
      </DragDropContext>
    </Modal>
  );
};