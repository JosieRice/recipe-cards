import gql from "graphql-tag";

// @ts-ignore
const addCookInstruction = (_root, variables, { cache, getCacheKey }) => {
  const id = getCacheKey({ __typename: "Recipe", id: variables.id });
  const fragment = gql`
    fragment recipe on Recipe {
      cookInstructions
    }
  `;
  const recipe = cache.readFragment({ fragment, id });
  const data = {
    ...recipe,
    cookInstructions: recipe.cookInstructions.concat([""])
  };
  cache.writeData({ id, data });
  return null;
};

export default addCookInstruction;
