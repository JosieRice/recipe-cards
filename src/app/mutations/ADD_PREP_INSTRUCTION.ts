import gql from "graphql-tag";

const ADD_PREP_INSTRUCTION = gql`
  mutation addPrepInstruction($id: Int!) {
    addPrepInstruction(id: $id) @client
  }
`;

export default ADD_PREP_INSTRUCTION;
