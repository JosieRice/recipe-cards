import gql from "graphql-tag";

const EDIT_RECIPE = gql`
  mutation editRecipe(
    $collection: String!
    $id: ID!
    $recipeName: String
    $description: String
    $prepTime: String
    $cookTime: String
    $prepInstructions: [String]
    $cookInstructions: [String]
    $ingredients: [String]
  ) {
    editRecipe(
      id: $id
      collection: $collection
      recipeName: $recipeName
      prepTime: $prepTime
      description: $description
      cookTime: $cookTime
      ingredients: $ingredients
      prepInstructions: $prepInstructions
      cookInstructions: $cookInstructions
    ) {
      code
      success
      message
      recipe {
        id
        recipeName
        prepTime
        description
        cookTime
        ingredients
        prepInstructions
        cookInstructions
      }
    }
  }
`;

export default EDIT_RECIPE;
