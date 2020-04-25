import gql from "graphql-tag";

// @ts-ignore
const setRecipeName = (_root, variables, { cache, getCacheKey }) => {
  const id = getCacheKey({ __typename: "Recipe", id: variables.id });
  const fragment = gql`
    fragment recipe on Recipe {
      recipeName
    }
  `;
  const recipe = cache.readFragment({ fragment, id });
  const data = {
    ...recipe,
    recipeName: variables.recipeName
  };
  cache.writeData({ id, data });
  return null;
};

export default setRecipeName;
