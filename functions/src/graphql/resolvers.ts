import recipes from "./queries/recipes";
import recipe from "./queries/recipe";

const resolvers = {
  Query: {
    recipes,
    recipe
  }
};

export default resolvers;
