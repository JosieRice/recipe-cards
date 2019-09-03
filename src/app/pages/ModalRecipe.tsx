import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { db } from "../services/Firebase";
import { useToasts } from 'react-toast-notifications';

// Style
import { RecipeCard } from "../components/styled/Page";
import { Modal, Instructions, Label, PhotoInModal, TitleWrapper } from "../components/styled/Modal";
import { userContext } from "../context/UserContext";
import { DragDropContext } from "react-beautiful-dnd";
import { DragResult } from "../types/Globals";
import Loading from "../components/Loading";
import Name from "../components/modalComponents/Name";
import Description from "../components/modalComponents/Description";
import List from "../components/modalComponents/List";
import Time from "../components/modalComponents/Time";
import { Ingredients } from "../components/styled/RecipeCard";
import { toastInfo, toastError } from "../utilites/Settings";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { CloseButton } from "../components/styled/Buttons";
import Source from "../components/modalComponents/Source";
import { UploadRecipePic } from "../utilites/FileUploader";
import LoginLogout from "../components/LoginLogout";

// @ts-ignore
export default function ModalRecipe({ match, history, collection }) {
  const [recipe, setRecipe] = useState();

  const [recipeName, setRecipeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [prepTime, setPrepTime] = useState<string>("");
  const [cookTime, setCookTime] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [prepInstructions, setPrepInstructions] = useState<string[]>([]);
  const [cookInstructions, setCookInstructions] = useState<string[]>([]);
  const [recipeID, setRecipeID] = useState<string>("");
  const [sourceUrl, setSourceUrl] = useState<string>("");
  const [sourceType, setSourceType] = useState<string>("");
  const [trackingId, setTrackingId] = useState<string>("");
  const [copyIds, setCopyIds] = useState<any>([]);

  const [update, setUpdate] = useState<boolean>(false)
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [reorder, setReorder] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false)

  const [user] = useContext(userContext);

  useEffect(() => {
    document.addEventListener('fullscreenchange', exitHandler);
    // document.addEventListener('webkitfullscreenchange', exitHandler);
    // document.addEventListener('mozfullscreenchange', exitHandler);
    // document.addEventListener('MSFullscreenChange', exitHandler);

    // db
    //   .collection('copy-tracking')
    //   .doc(match.params.id)
    //   .get()
    //   .then(function (doc) {
    //     if (doc.exists) {
    //       console.log("Document data:", doc.data());
    //       setCopyIds(doc.data())

    //     } else {
    //       // doc.data() will be undefined in this case
    //       addToast(`No such document!`, toastError);
    //       console.log("No such document!");
    //     }
    //   }).catch(function (error) {
    //     addToast(`Unable to load recipe because ${error}, try again later`, toastError);
    //     console.log("Error getting document:", error);
    //   });

    db
      .collection(collection)
      .doc(match.params.id)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          setRecipeID(doc.id);
          const data = doc.data()

          setTrackingId(data.originalDocId)

          setRecipe(data);
          setRecipeName(data.recipeName);
          setDescription(data.description);
          setImageUrl(data.imageUrl);
          setPrepTime(data.prepTime);
          setCookTime(data.cookTime);
          setIngredients(data.ingredients);
          setPrepInstructions(data.prepInstructions);
          setCookInstructions(data.cookInstructions);
          setSourceUrl(data.sourceUrl);
          setSourceType(data.sourceType);

        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function (error) {
        addToast(`Unable to load recipe because ${error}, try again later`, toastError);
        console.log("Error getting document:", error);
      });



  }, []);

  const { addToast } = useToasts();

  const onDragEnd = (result: DragResult) => {
    const { destination, source } = result;

    let sameListSameSpot;
    let differentList;

    if (destination) {
      sameListSameSpot = destination.droppableId === source.droppableId && destination.index === source.index;

      differentList = source.droppableId !== destination.droppableId;
    }

    if (!destination) {
      return;
    } else if (!destination.droppableId) {
      return;
    } else if (differentList) {
      return;
    } else if (sameListSameSpot) {
      return;
    } else {

      if (source.droppableId === 'ingredients') {
        arrayReorder(result, ingredients, setIngredients);
      }

      if (source.droppableId === 'prepInstructions') {
        arrayReorder(result, prepInstructions, setPrepInstructions);
      }

      if (source.droppableId === 'cookInstructions') {
        arrayReorder(result, cookInstructions, setCookInstructions);
      }

    }
  }

  const arrayReorder = (result: DragResult, array: Array<string>, setState: any) => {
    const { destination, source } = result;

    let newArr = Array.from(array);
    newArr.splice(source.index, 1);
    newArr.splice(destination.index, 0, array[source.index]);

    setState(newArr);
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

  const modalSave = (e: any) => {
    e.stopPropagation();
    handleUpdate(e);
    history.goBack();
  };

  const modalCloseUnsaved = (e: any) => {
    e.stopPropagation();
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

    db
      .collection(user.uid)
      .add({
        recipeName,
        description,
        imageUrl,
        prepTime,
        cookTime,
        prepInstructions,
        cookInstructions,
        ingredients,
        ownerUid: user.uid,
        displayName: user.displayName,
        sourceUrl,
        sourceType,
        creatorUid: recipe.creatorUid,
        dateUpdated: Date.now()
      })
      .then(function () {
        addToast('Recipe Copied into your recipes.', toastInfo)
        setUpdate(false);
      })
      .catch(function (error) {
        addToast(`Unable to copy recipe because ${error}, try again later`, toastError)
      });
  }

  const handleUpdate = (e: any) => {
    e.preventDefault();

    if (user.uid !== recipe.ownerUid) {
      copyRecipe(e)
      addToast('We added a copy of this recipe to your box.', toastInfo)
      return;
    }

    // removes empty strings from array
    const cleanPrepInstructions = prepInstructions.filter(Boolean);
    setPrepInstructions(cleanPrepInstructions);

    const cleanCookInstructions = cookInstructions.filter(Boolean);
    setCookInstructions(cleanCookInstructions);

    const cleanIngredients = ingredients.filter(Boolean);
    setIngredients(cleanIngredients);

    db
      .collection(user.uid)
      .doc(recipeID).update({
        recipeName,
        description,
        imageUrl,
        prepTime,
        cookTime,
        prepInstructions: cleanPrepInstructions,
        cookInstructions: cleanCookInstructions,
        ingredients: cleanIngredients,
        ownerUid: user.uid,
        displayName: user.displayName,
        sourceUrl,
        sourceType,
        dateUpdated: Date.now()
      })
      .then(function () {
        // TODO: use third arguement of optional cb to close modal?
        addToast('Updated Successfully', toastInfo);
        setUpdate(false);
      })
      .catch(function (error) {
        addToast(`Unable to Update because ${error}, try again later`, toastError);
      });
  }

  if (!recipe) return (<Loading />);

  const canReorder = user && !fullscreen && reorder;
  const cantReorder = user && !fullscreen && !reorder;
  const canCopy = user && !fullscreen && user && user.uid !== recipe.ownerUid;
  const canUpdate = user && !fullscreen && update;
  const canLogin = !user && !fullscreen;

  return (
    <Modal>
      <DragDropContext onDragEnd={onDragEnd}>
        <RecipeCard id={match.params.id}>
          <div style={{ margin: '0 0 10px 0' }}>

            {imageUrl && !fullscreen && <PhotoInModal src={imageUrl} />}
            {!imageUrl && !fullscreen &&
              <UploadRecipePic
                modal={true}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                setUpdate={setUpdate}
              />}

            <TitleWrapper fullscreen={fullscreen}>
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

              {!fullscreen && <Source
                sourceUrl={sourceUrl}
                sourceType={sourceType}
              />}
            </TitleWrapper>
          </div>

          <div style={{ display: 'flex', width: "100%" }}>

            <Ingredients>
              <Label>Ingredients: </Label>
              <List
                listId="ingredients"
                recipe={recipe}
                array={ingredients}
                setArray={setIngredients}
                fullscreen={fullscreen}
                onChange={handleArrayChange}
                reorder={reorder}
                setUpdate={setUpdate}
              />
            </Ingredients>

            <Instructions>
              <Label>Prep Time: </Label>
              <Time
                fullscreen={fullscreen}
                value={prepTime}
                setValue={setPrepTime}
                setUpdate={setUpdate}
              />
              <List
                listId="prepInstructions"
                recipe={recipe}
                array={prepInstructions}
                setArray={setPrepInstructions}
                fullscreen={fullscreen}
                onChange={handleArrayChange}
                reorder={reorder}
                setUpdate={setUpdate}
              />

              <br />
              <Label>Cook Time: </Label>
              <Time
                fullscreen={fullscreen}
                value={cookTime}
                setValue={setCookTime}
                setUpdate={setUpdate}
              />
              <List
                listId="cookInstructions"
                recipe={recipe}
                array={cookInstructions}
                setArray={setCookInstructions}
                fullscreen={fullscreen}
                onChange={handleArrayChange}
                reorder={reorder}
                setUpdate={setUpdate}
              />

            </Instructions>
          </div>

          {/* BUTTON TOWN */}

          {/* TODO: make this open a confirmation modal */}

          {/* {copyIds && <div>test</div>} */}

          {update ?
            <CloseButton onClick={() => setConfirmModal(true)}>X</CloseButton> :
            <CloseButton onClick={history.goBack}>X</CloseButton>
          }

          {canReorder && <button onClick={() => setReorder(false)}>turn reorder off</button>}
          {cantReorder && <button onClick={() => setReorder(true)}>turn reorder on</button>}

          {canCopy && <button onClick={copyRecipe}>Add to my recipes</button>}

          {canUpdate && <button onClick={handleUpdate}>update</button>}

          {!fullscreen && <button onClick={startFullScreen}>Cook now</button>}

          {canLogin && <LoginLogout />}

          {confirmModal && <ConfirmationModal
            show={confirmModal}
            save={modalSave}
            closeUnsaved={modalCloseUnsaved}
            close={() => setConfirmModal(false)}
          >
            How should we handle the changes that you made?
          </ConfirmationModal>}

        </RecipeCard>
      </DragDropContext>

    </Modal>
  );
};
