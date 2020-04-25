import recipes from "./queries/recipes";
import recipe from "./queries/recipe";
import editRecipe from "./mutations/editRecipe";

const resolvers = {
  Query: {
    recipes,
    recipe
  },
  Mutation: {
    editRecipe
  }
};

export default resolvers;
