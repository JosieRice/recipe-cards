import * as React from "react";
import { useRef } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useToasts } from "react-toast-notifications";

// Style
import { RecipeCard } from "../components/styled/Page";
import {
  Modal,
  Instructions,
  Label,
  PhotoInModal,
  TitleWrapper,
  UL,
  OL
} from "../components/styled/Modal";
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
import gql from "graphql-tag";

const ADD_INGREDIENT = gql`
  mutation addIngredient($id: Int!) {
    addIngredient(id: $id) @client
  }
`;

const ADD_PREP_INSTRUCTION = gql`
  mutation addPrepInstruction($id: Int!) {
    addPrepInstruction(id: $id) @client
  }
`;

const ADD_COOK_INSTRUCTION = gql`
  mutation addCookInstruction($id: Int!) {
    addCookInstruction(id: $id) @client
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
  let recipeNameRef = useRef(null);
  let descriptionRef = useRef(null);
  let prepTimeRef = useRef(null);
  let cookTimeRef = useRef(null);
  let ingredientsRef = useRef([]);
  let prepInstructionsRef = useRef([]);
  let cookInstructionsRef = useRef([]);

  const { loading: queryLoad, error: queryError, data: queryData } = useQuery(
    GET_RECIPE,
    {
      variables: { collection, id: match.params.id }
    }
  );

  const [editRecipe, { loading: editRecipeLoading }] = useMutation(EDIT_RECIPE);

  const [addIngredient] = useMutation(ADD_INGREDIENT);
  const [addPrepInstruction] = useMutation(ADD_PREP_INSTRUCTION);
  const [addCookInstruction] = useMutation(ADD_COOK_INSTRUCTION);

  const { addToast } = useToasts();

  // console.log("M LOAD: ", editRecipeLoading);

  if (queryLoad) return <Loading />;
  if (queryError) return <div>error</div>;

  const {
    id,
    recipeName,
    description,
    imageUrl,
    prepTime,
    cookTime,
    ingredients,
    prepInstructions,
    cookInstructions,
    sourceUrl,
    sourceType
  } = queryData.recipe;

  const handleSubmit = (e: any) => {
    e.preventDefault;
    editRecipe({
      variables: {
        collection,
        id: match.params.id,
        recipeName: recipeNameRef.current.value,
        description: descriptionRef.current.props.value,
        prepTime: prepTimeRef.current.value,
        cookTime: cookTimeRef.current.value,
        ingredients: ingredientsRef.current.map(el => el.value),
        prepInstructions: prepInstructionsRef.current.map(el => el.value),
        cookInstructions: cookInstructionsRef.current.map(el => el.value)
      }
    }).then(res => {
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
        <div style={{ margin: "0 0 10px 0" }}>
          <PhotoInModal src={imageUrl} />
          <TitleWrapper>
            <RecipeName initialValue={recipeName} forwardRef={recipeNameRef} />
            <Description
              initialValue={description}
              forwardRef={descriptionRef}
            />
            <Source sourceUrl={sourceUrl} sourceType={sourceType} />
          </TitleWrapper>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <Ingredients>
            <Label>Ingredients: </Label>
            <UL>
              {ingredients.map((item: any, index: any) => (
                <li>
                  <ListItem
                    initialValue={item}
                    // key={`${item}${index}`}
                    forwardRef={(ref: any) =>
                      (ingredientsRef.current[index] = ref)
                    }
                  />
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
                <li>
                  <ListItem
                    initialValue={item}
                    // key={`${item}${index}`}
                    forwardRef={(ref: any) =>
                      (prepInstructionsRef.current[index] = ref)
                    }
                  />
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
                <li>
                  <ListItem
                    initialValue={item}
                    // key={`${item}${index}`}
                    forwardRef={(ref: any) =>
                      (cookInstructionsRef.current[index] = ref)
                    }
                  />
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
