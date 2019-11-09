import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { db } from "../services/Firebase";
import { useToasts } from "react-toast-notifications";
import { UploadRecipePic } from "../utilites/FileUploader";
import { toastInfo, toastError } from "../utilites/Settings";
import { userContext } from "../context/UserContext";
import { DragDropContext } from "react-beautiful-dnd";
import { DragResult } from "../types/Globals";

// Style
import { RecipeCard } from "../components/styled/Page";
import {
  Modal,
  Instructions,
  Label,
  PhotoInModal,
  TitleWrapper
} from "../components/styled/Modal";
import { Ingredients } from "../components/styled/RecipeCard";
import { CloseButton } from "../components/styled/Buttons";

// Components
import Loading from "../components/Loading";
import Name from "../components/modalComponents/Name";
import Description from "../components/modalComponents/Description";
import List from "../components/modalComponents/List";
import Time from "../components/modalComponents/Time";
import { ConfirmationModal } from "../components/ConfirmationModal";
import Source from "../components/modalComponents/Source";
import LoginLogout from "../components/LoginLogout";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const RECIPE = gql`
  query getRecipe($collection: String!, $id: ID!) {
    recipe(collection: $collection, id: $id) {
      recipeName
      id
      recipeName
      description
      imageUrl
      prepTime
      cookTime
      ingredients
      prepInstructions
      cookInstructions
      sourceUrl
      sourceType
    }
  }
`;

type Match = {
  params: { id: string };
};

interface Props {
  match: Match;
  history: any;
  collection: string;
}

export default function ModalRecipe({ match, history, collection }: Props) {
  const [user] = useContext(userContext);
  const [update, setUpdate] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [reorder, setReorder] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const { loading, error, data } = useQuery(RECIPE, {
    variables: { collection, id: match.params.id }
  });

  if (loading) return <Loading />;
  if (error) return <div>error</div>;

  const {
    recipeName,
    id,
    description,
    imageUrl,
    prepTime,
    cookTime,
    ingredients,
    prepInstructions,
    cookInstructions,
    sourceUrl,
    sourceType
  } = data.recipe;

  // const escCloseModal = (event: any) => {
  //   if (event.keyCode === 27) {
  //     history.goBack();
  //   }
  // };

  // // useEffect(() => {
  // // db
  // //   .collection('copy-tracking')
  // //   .doc(match.params.id)
  // //   .get()
  // //   .then(function (doc) {
  // //     if (doc.exists) {
  // //       console.log("Document data:", doc.data());
  // //       setCopyIds(doc.data())
  // //     } else {
  // //       // doc.data() will be undefined in this case
  // //       addToast(`No such document!`, toastError);
  // //       console.log("No such document!");
  // //     }
  // //   }).catch(function (error) {
  // //     addToast(`Unable to load recipe because ${error}, try again later`, toastError);
  // //     console.log("Error getting document:", error);
  // //   });
  // // });

  // useEffect(() => {
  //   document.addEventListener("fullscreenchange", exitHandler);
  //   document.addEventListener("webkitfullscreenchange", exitHandler);
  //   document.addEventListener("mozfullscreenchange", exitHandler);
  //   document.addEventListener("MSFullscreenChange", exitHandler);

  //   return () => {
  //     document.removeEventListener("fullscreenchange", exitHandler);
  //     document.removeEventListener("webkitfullscreenchange", exitHandler);
  //     document.removeEventListener("mozfullscreenchange", exitHandler);
  //     document.removeEventListener("MSFullscreenChange", exitHandler);
  //   };
  // }, []);

  // useEffect(() => {
  //   document.addEventListener("keydown", escCloseModal, { once: true });

  //   return () => {
  //     document.removeEventListener("keydown", escCloseModal);
  //   };
  // }, []);

  // const { addToast } = useToasts();

  // const onDragEnd = (result: DragResult) => {
  //   const { destination, source } = result;

  //   let sameListSameSpot;
  //   let differentList;

  //   if (destination) {
  //     sameListSameSpot =
  //       destination.droppableId === source.droppableId &&
  //       destination.index === source.index;

  //     differentList = source.droppableId !== destination.droppableId;
  //   }

  //   if (!destination) {
  //     return;
  //   } else if (!destination.droppableId) {
  //     return;
  //   } else if (differentList) {
  //     return;
  //   } else if (sameListSameSpot) {
  //     return;
  //   } else {
  //     if (source.droppableId === "ingredients") {
  //       arrayReorder(result, ingredients, setIngredients);
  //     }

  //     if (source.droppableId === "prepInstructions") {
  //       arrayReorder(result, prepInstructions, setPrepInstructions);
  //     }

  //     if (source.droppableId === "cookInstructions") {
  //       arrayReorder(result, cookInstructions, setCookInstructions);
  //     }
  //   }
  // };

  // const arrayReorder = (
  //   result: DragResult,
  //   array: Array<string>,
  //   setState: any
  // ) => {
  //   const { destination, source } = result;

  //   let newArr = Array.from(array);
  //   newArr.splice(source.index, 1);
  //   newArr.splice(destination.index, 0, array[source.index]);

  //   setState(newArr);
  //   setUpdate(true);
  // };

  // const exitHandler = () => {
  //   if (!document.fullscreenElement) {
  //     setFullscreen(false);
  //   }
  // };

  // const handleArrayChange = (
  //   index: number,
  //   array: any,
  //   ingredient: string,
  //   cb: any
  // ) => {
  //   let newList = [...array];
  //   newList[index] = ingredient;

  //   cb(newList);
  //   setUpdate(true);
  // };

  // const modalSave = (e: any) => {
  //   e.stopPropagation();
  //   handleUpdate(e);
  //   history.goBack();
  // };

  // const modalCloseUnsaved = (e: any) => {
  //   e.stopPropagation();
  //   history.goBack();
  // };

  // interface Document {
  //   requestFullscreen?: () => void;
  //   mozRequestFullScreen?: () => void;
  //   webkitRequestFullscreen?: () => void;
  //   msRequestFullscreen?: () => void;
  // }

  // const startFullScreen = () => {
  //   const elem: Document = document.getElementById(match.params.id);
  //   if (elem.requestFullscreen) {
  //     elem.requestFullscreen();
  //   } else if (elem.mozRequestFullScreen) {
  //     /* Firefox */
  //     elem.mozRequestFullScreen();
  //   } else if (elem.webkitRequestFullscreen) {
  //     /* Chrome, Safari and Opera */
  //     elem.webkitRequestFullscreen();
  //   } else if (elem.msRequestFullscreen) {
  //     /* IE/Edge */
  //     elem.msRequestFullscreen();
  //   }
  //   setFullscreen(true);
  // };

  // const copyRecipe = (e: any) => {
  //   e.preventDefault();

  //   db.collection(user.uid)
  //     .add({
  //       recipeName,
  //       description,
  //       imageUrl,
  //       prepTime,
  //       cookTime,
  //       prepInstructions,
  //       cookInstructions,
  //       ingredients,
  //       ownerUid: user.uid,
  //       displayName: user.displayName,
  //       sourceUrl,
  //       sourceType,
  //       creatorUid: recipe.creatorUid,
  //       dateUpdated: Date.now()
  //     })
  //     .then(function() {
  //       addToast("Recipe Copied into your recipes.", toastInfo);
  //       setUpdate(false);
  //     })
  //     .catch(function(error) {
  //       addToast(
  //         `Unable to copy recipe because ${error}, try again later`,
  //         toastError
  //       );
  //     });
  // };

  // const handleUpdate = (e: any) => {
  //   e.preventDefault();

  //   if (user.uid !== recipe.ownerUid) {
  //     copyRecipe(e);
  //     addToast("We added a copy of this recipe to your box.", toastInfo);
  //     return;
  //   }

  //   // removes empty strings from array
  //   const cleanPrepInstructions = prepInstructions.filter(Boolean);
  //   setPrepInstructions(cleanPrepInstructions);

  //   const cleanCookInstructions = cookInstructions.filter(Boolean);
  //   setCookInstructions(cleanCookInstructions);

  //   const cleanIngredients = ingredients.filter(Boolean);
  //   setIngredients(cleanIngredients);

  //   db.collection(user.uid)
  //     .doc(recipeID)
  //     .update({
  //       recipeName,
  //       description,
  //       imageUrl,
  //       prepTime,
  //       cookTime,
  //       prepInstructions: cleanPrepInstructions,
  //       cookInstructions: cleanCookInstructions,
  //       ingredients: cleanIngredients,
  //       ownerUid: user.uid,
  //       displayName: user.displayName,
  //       sourceUrl,
  //       sourceType,
  //       dateUpdated: Date.now()
  //     })
  //     .then(function() {
  //       // TODO: use third arguement of optional cb to close modal?
  //       addToast("Updated Successfully", toastInfo);
  //       setUpdate(false);
  //     })
  //     .catch(function(error) {
  //       addToast(
  //         `Unable to Update because ${error}, try again later`,
  //         toastError
  //       );
  //     });
  // };

  // if (!recipe) return <Loading />;

  // const canReorder = user && !fullscreen && reorder;
  // const cantReorder = user && !fullscreen && !reorder;
  // const canCopy = user && !fullscreen && user && user.uid !== recipe.ownerUid;
  // const canUpdate = user && !fullscreen && update;
  // const canLogin = !user && !fullscreen;

  return (
    <Modal>
      <RecipeCard id={id}>
        <div style={{ margin: "0 0 10px 0" }}>
          <PhotoInModal src={imageUrl} />
          <Name initialValue={recipeName} />
          <Description initialValue={description} />
          <Source sourceUrl={sourceUrl} sourceType={sourceType} />
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <Ingredients>
            <Label>Ingredients: </Label>
            <List listItems={ingredients} />
          </Ingredients>
          <Instructions>
            <Label>Prep Time: </Label>
            <Time initialValue={prepTime} />
            <List listItems={prepInstructions} />
            <br />
            <Label>Cook Time: </Label>
            <Time initialValue={cookTime} />
            <List listItems={cookInstructions} />
          </Instructions>
        </div>
        <CloseButton onClick={history.goBack}>X</CloseButton>
      </RecipeCard>
    </Modal>
  );

  //           {/* BUTTON TOWN */}

  //           {/* TODO: make this open a confirmation modal */}

  //           {/* {copyIds && <div>test</div>} */}

  //           {update ? (
  //             <CloseButton onClick={() => setConfirmModal(true)}>X</CloseButton>
  //           ) : (
  //             <CloseButton onClick={history.goBack}>X</CloseButton>
  //           )}

  //           {canReorder && (
  //             <button onClick={() => setReorder(false)}>turn reorder off</button>
  //           )}
  //           {cantReorder && (
  //             <button onClick={() => setReorder(true)}>turn reorder on</button>
  //           )}

  //           {canCopy && <button onClick={copyRecipe}>Add to my recipes</button>}

  //           {canUpdate && <button onClick={handleUpdate}>update</button>}

  //           {!fullscreen && <button onClick={startFullScreen}>Cook now</button>}

  //           {canLogin && <LoginLogout />}

  //           {confirmModal && (
  //             <ConfirmationModal
  //               show={confirmModal}
  //               save={modalSave}
  //               closeUnsaved={modalCloseUnsaved}
  //               close={() => setConfirmModal(false)}
  //             >
  //               How should we handle the changes that you made?
  //             </ConfirmationModal>
  //           )}
  //       </DragDropContext>
  // }
}
