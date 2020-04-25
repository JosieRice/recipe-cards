import gql from "graphql-tag";

// @ts-ignore
const addIngredient = (_root, variables, { cache, getCacheKey }) => {
  const id = getCacheKey({ __typename: "Recipe", id: variables.id });
  const fragment = gql`
    fragment recipe on Recipe {
      ingredients
    }
  `;
  const recipe = cache.readFragment({ fragment, id });
  const data = { ...recipe, ingredients: recipe.ingredients.concat([""]) };
  cache.writeData({ id, data });
  return null;
};

export default addIngredient;
