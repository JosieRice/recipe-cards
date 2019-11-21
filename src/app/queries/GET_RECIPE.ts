import gql from "graphql-tag";

const GET_RECIPE = gql`
  query getRecipe($collection: String!, $id: ID!) {
    recipe(collection: $collection, id: $id) {
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

export default GET_RECIPE;
