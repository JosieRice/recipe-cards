import * as React from "react";
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
  UL
} from "../components/styled/Modal";
import { Ingredients } from "../components/styled/RecipeCard";
import { CloseButton } from "../components/styled/Buttons";

// Components
import Loading from "../components/Loading";
import Name from "../components/modalComponents/Name";
import Description from "../components/modalComponents/Description";
import List from "../components/modalComponents/List";
import Time from "../components/modalComponents/Time";
import Source from "../components/modalComponents/Source";

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

  return (
    <Modal>
      <RecipeCard id={id}>
        <div style={{ margin: "0 0 10px 0" }}>
          <PhotoInModal src={imageUrl} />
          <TitleWrapper>
            <Name initialValue={recipeName} />
            <Description initialValue={description} />
            <Source sourceUrl={sourceUrl} sourceType={sourceType} />
          </TitleWrapper>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <Ingredients>
            <Label>Ingredients: </Label>
            <List listItems={ingredients} name="ingredients" />
          </Ingredients>
          <Instructions>
            <Label>Prep Time: </Label>
            <Time initialValue={prepTime} />
            <List listItems={prepInstructions} name="prepInstrutions" />
            <br />
            <Label>Cook Time: </Label>
            <Time initialValue={cookTime} />
            <List listItems={cookInstructions} name="cookInstructions" />
          </Instructions>
        </div>
        <CloseButton onClick={history.goBack}>X</CloseButton>
      </RecipeCard>
    </Modal>
  );
}
