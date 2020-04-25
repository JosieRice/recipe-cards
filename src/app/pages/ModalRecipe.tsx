import * as React from "react";
import { useRef, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useToasts } from "react-toast-notifications";
import { UploadRecipePic } from "../utilites/FileUploader";

// Style
import { RecipeCard } from "../components/styled/Page";
import { Modal, Instructions, Label, PhotoInModal, TitleWrapper, UL, OL } from "../components/styled/Modal";
import { Ingredients } from "../components/styled/RecipeCard";
import { CloseButton } from "../components/styled/Buttons";

// Components
import Loading from "../components/Loading";
import RecipeName from "../components/modalComponents/RecipeName";
import Description from "../components/modalComponents/Description";
import Time from "../components/modalComponents/Time";
import Source from "../components/modalComponents/Source";
import ListItem from "../components/modalComponents/ListItem";
import { toastInfo, toastError } from "../utilites/Settings";
import EDIT_RECIPE from "../mutations/EDIT_RECIPE";
import GET_RECIPE from "../queries/GET_RECIPE";
import ADD_INGREDIENT from "../mutations/ADD_INGREDIENT";
import ADD_PREP_INSTRUCTION from "../mutations/ADD_PREP_INSTRUCTION";
import ADD_COOK_INSTRUCTION from "../mutations/ADD_COOK_INSTRUCTION";

type Match = {
  params: { id: string };
};

interface Props {
  match: Match;
  history: any;
  collection: string;
}

export default function ModalRecipe({ match, history, collection }: Props) {
  let descriptionRef = useRef(null);
  let prepTimeRef = useRef(null);
  let cookTimeRef = useRef(null);
  let ingredientsRef = useRef([]);
  let prepInstructionsRef = useRef([]);
  let cookInstructionsRef = useRef([]);

  const { loading: queryLoad, error: queryError, data: queryData } = useQuery(GET_RECIPE, {
    variables: { collection, id: match.params.id }
  });

  const [editRecipe] = useMutation(EDIT_RECIPE);
  const [addIngredient] = useMutation(ADD_INGREDIENT);
  const [addPrepInstruction] = useMutation(ADD_PREP_INSTRUCTION);
  const [addCookInstruction] = useMutation(ADD_COOK_INSTRUCTION);

  useEffect(() => {
    const escCloseModal = (event: any) => {
      if (event.keyCode === 27) {
        history.goBack();
      }
    };
    document.addEventListener("keydown", escCloseModal, { once: true });

    return () => {
      document.removeEventListener("keydown", escCloseModal);
    };
  });

  const { addToast } = useToasts();

  if (queryLoad) return <Loading />;
  if (queryError) return <div>error</div>;

  const { id, recipeName, description, imageUrl, prepTime, cookTime, ingredients, prepInstructions, cookInstructions, sourceUrl, sourceType } = queryData.recipe;

  const handleSubmit = (e: any) => {
    e.preventDefault;
    const safeCollection = collection === 'original' ? collection : "";
    editRecipe({
      variables: {
        collection: safeCollection, // forces server to get collection from context via jwt if anything but 'original' is passed in
        id,
        imageUrl,
        recipeName,
        description: descriptionRef.current.props.value,
        prepTime: prepTimeRef.current.value,
        cookTime: cookTimeRef.current.value,
        ingredients: ingredientsRef.current.map((el) => el.value),
        prepInstructions: prepInstructionsRef.current.map((el) => el.value),
        cookInstructions: cookInstructionsRef.current.map((el) => el.value)
      }
    }).then((res) => {
      const { success, message } = res.data.editRecipe;
      if (success) {
        addToast(message, toastInfo);
      } else {
        addToast(message, toastError);
      }
    });
  };

  return (
    <Modal>
      <RecipeCard id={id}>
        <div style={{ margin: "0 0 10px 0", display: "flex" }}>
          {imageUrl ? <PhotoInModal src={imageUrl} /> : <UploadRecipePic modal={true} imageUrl={imageUrl} id={id} />}

          <TitleWrapper>
            {/* TODO: move state of recipe name into graphql state */}
            <RecipeName id={id} recipeName={recipeName} />
            <Description initialValue={description} forwardRef={descriptionRef} />
            <Source sourceUrl={sourceUrl} sourceType={sourceType} />
          </TitleWrapper>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <Ingredients>
            <Label>Ingredients: </Label>
            <UL>
              {ingredients.map((item: any, index: any) => (
                <li key={`ingred${index}`}>
                  <ListItem initialValue={item} forwardRef={(ref: any) => (ingredientsRef.current[index] = ref)} />
                </li>
              ))}
            </UL>
            <button
              onClick={() => {
                addIngredient({
                  variables: { id: match.params.id }
                });
              }}
            >
              +
            </button>
          </Ingredients>
          <Instructions>
            <Label>Prep Time: </Label>
            <Time initialValue={prepTime} forwardRef={prepTimeRef} />
            <OL>
              {prepInstructions.map((item: any, index: any) => (
                <li key={`prep${index}`}>
                  <ListItem initialValue={item} forwardRef={(ref: any) => (prepInstructionsRef.current[index] = ref)} />
                </li>
              ))}
            </OL>
            <button
              onClick={() => {
                addPrepInstruction({
                  variables: { id: match.params.id }
                });
              }}
            >
              +
            </button>
            <br />
            <Label>Cook Time: </Label>
            <Time initialValue={cookTime} forwardRef={cookTimeRef} />
            <OL>
              {cookInstructions.map((item: any, index: any) => (
                <li key={`cook${index}`}>
                  <ListItem initialValue={item} forwardRef={(ref: any) => (cookInstructionsRef.current[index] = ref)} />
                </li>
              ))}
            </OL>
            <button
              onClick={() => {
                addCookInstruction({
                  variables: { id: match.params.id }
                });
              }}
            >
              +
            </button>
          </Instructions>
        </div>
        <CloseButton onClick={history.goBack}>X</CloseButton>
        <button onClick={handleSubmit}>Submit</button>
      </RecipeCard>
    </Modal>
  );
}
