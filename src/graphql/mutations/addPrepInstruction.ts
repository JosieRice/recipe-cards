import gql from "graphql-tag";

// @ts-ignore
const addPrepInstruction = (_root, variables, { cache, getCacheKey }) => {
  const id = getCacheKey({ __typename: "Recipe", id: variables.id });
  const fragment = gql`
    fragment recipe on Recipe {
      prepInstructions
    }
  `;
  const recipe = cache.readFragment({ fragment, id });
  const data = {
    ...recipe,
    prepInstructions: recipe.prepInstructions.concat([""])
  };
  cache.writeData({ id, data });
  return null;
};

export default addPrepInstruction;
