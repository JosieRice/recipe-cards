import recipeDraft from "./queries/recipeDraft";
import addIngredient from "./mutations/addIngredient";
import addPrepInstruction from "./mutations/addPrepInstruction";
import addCookInstruction from "./mutations/addCookInstruction";

const resolvers = {
  Query: {
    recipeDraft
  },
  Mutation: {
    addIngredient,
    addPrepInstruction,
    addCookInstruction
  }
};

export default resolvers;
