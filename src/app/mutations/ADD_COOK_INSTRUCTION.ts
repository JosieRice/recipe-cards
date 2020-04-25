import gql from "graphql-tag";

const ADD_COOK_INSTRUCTION = gql`
  mutation addCookInstruction($id: Int!) {
    addCookInstruction(id: $id) @client
  }
`;

export default ADD_COOK_INSTRUCTION;
