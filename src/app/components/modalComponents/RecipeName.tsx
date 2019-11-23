import * as React from "react";
import { NameInput } from "../styled/Modal";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const SET_RECIPE_NAME = gql`
  mutation setRecipeName($id: Int!, $recipeName: String!) {
    setRecipeName(id: $id, recipeName: $recipeName) @client
  }
`;

interface Props {
  id: string;
  recipeName: string;
}

export default function RecipeName({ id, recipeName }: Props) {
  const [setRecipeName] = useMutation(SET_RECIPE_NAME);

  return (
    <NameInput
      defaultValue={recipeName}
      onChange={(e) => {
        setRecipeName({
          variables: { id, recipeName: e.target.value }
        });
      }}
    />
  );
}
