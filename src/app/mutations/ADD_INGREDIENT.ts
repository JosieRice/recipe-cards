import gql from "graphql-tag";

const ADD_INGREDIENT = gql`
  mutation addIngredient($id: Int!) {
    addIngredient(id: $id) @client
  }
`;

export default ADD_INGREDIENT;
