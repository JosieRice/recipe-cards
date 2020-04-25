import gql from "graphql-tag";

const EDIT_RECIPE = gql`
  mutation editRecipe(
    $collection: String!
    $id: ID!
    $imageUrl: String
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
      imageUrl: $imageUrl
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
        imageUrl
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
