import * as React from "react";
import { useRef } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

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
  let recipeNameRef = useRef(null);
  let descriptionRef = useRef(null);
  let prepTimeRef = useRef(null);
  let cookTimeRef = useRef(null);
  let ingredientsRef = useRef([]);
  let prepInstructionsRef = useRef([]);
  let cookInstructionsRef = useRef([]);

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

  const handleSubmit = (e: any) => {
    e.preventDefault;
    console.log("Name: ", recipeNameRef.current.value);
    console.log("Description: ", descriptionRef.current.props.value);
    console.log("Prep Time: ", prepTimeRef.current.value);
    console.log("Cook Time: ", cookTimeRef.current.value);
    console.log("Ingredients: ", ingredientsRef.current[0].value);
    console.log("Prep Instructions: ", prepInstructionsRef.current[0].value);
    console.log("Cook Instructions: ", cookInstructionsRef.current[0].value);
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
                    key={`${name}${index}`}
                    forwardRef={(ref: any) =>
                      (ingredientsRef.current[index] = ref)
                    }
                  />
                </li>
              ))}
            </UL>
          </Ingredients>
          <Instructions>
            <Label>Prep Time: </Label>
            <Time initialValue={prepTime} forwardRef={prepTimeRef} />
            <OL>
              {prepInstructions.map((item: any, index: any) => (
                <li>
                  <ListItem
                    initialValue={item}
                    key={`${name}${index}`}
                    forwardRef={(ref: any) =>
                      (prepInstructionsRef.current[index] = ref)
                    }
                  />
                </li>
              ))}
            </OL>
            <br />
            <Label>Cook Time: </Label>
            <Time initialValue={cookTime} forwardRef={cookTimeRef} />
            <OL>
              {cookInstructions.map((item: any, index: any) => (
                <li>
                  <ListItem
                    initialValue={item}
                    key={`${name}${index}`}
                    forwardRef={(ref: any) =>
                      (cookInstructionsRef.current[index] = ref)
                    }
                  />
                </li>
              ))}
            </OL>
          </Instructions>
        </div>
        <CloseButton onClick={history.goBack}>X</CloseButton>
        <button onClick={handleSubmit}>Submit</button>
      </RecipeCard>
    </Modal>
  );
}
