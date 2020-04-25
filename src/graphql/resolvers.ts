import recipeDraft from "./queries/recipeDraft";
import addIngredient from "./mutations/addIngredient";
import addPrepInstruction from "./mutations/addPrepInstruction";
import addCookInstruction from "./mutations/addCookInstruction";
import setImageUrl from "./mutations/setImageUrl";
import setRecipeName from "./mutations/setRecipeName";

const resolvers = {
  Query: {
    recipeDraft
  },
  Mutation: {
    addIngredient,
    addPrepInstruction,
    addCookInstruction,
    setImageUrl,
    setRecipeName
  }
};

export default resolvers;
