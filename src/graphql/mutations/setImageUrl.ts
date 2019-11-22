import gql from "graphql-tag";

// @ts-ignore
const setImageUrl = (_root, variables, { cache, getCacheKey }) => {
  const id = getCacheKey({ __typename: "Recipe", id: variables.id });
  const fragment = gql`
    fragment recipe on Recipe {
      imageUrl
    }
  `;
  const recipe = cache.readFragment({ fragment, id });
  const data = {
    ...recipe,
    imageUrl: variables.imageUrl
  };
  cache.writeData({ id, data });
  return null;
};

export default setImageUrl;
