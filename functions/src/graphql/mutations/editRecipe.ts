import db from "../firestore";

// TODO: get a response code for responses? or just hard code them?
const editRecipe = async (
  _: null,
  args: {
    collection: string;
    id: string;
    recipeName: string;
    description: string;
    prepTime: string;
    cookTime: string;
    prepInstructions: string[];
    cookInstructions: string[];
    ingredients: string[];
  }
) => {
  const {
    collection,
    id,
    recipeName,
    description,
    prepTime,
    cookTime,
    prepInstructions,
    cookInstructions,
    ingredients
  } = args;
  const result = db
    .collection(collection)
    .doc(id)
    .update({
      recipeName,
      description,
      prepTime,
      cookTime,
      prepInstructions,
      cookInstructions,
      ingredients,
      dateUpdated: Date.now()
    });

  if (!result)
    return {
      code: "todo",
      success: false,
      message: "Failed to update recipe"
    };

  // TODO: this updated recipe should probably come from the database or update response. not sure how to do that in firestore
  const recipe = {
    collection,
    id,
    recipeName,
    description,
    prepTime,
    cookTime,
    prepInstructions,
    cookInstructions,
    ingredients
  };

  return {
    code: "todo",
    success: true,
    message: "Recipe was updated successfully",
    recipe
  };
};

export default editRecipe;
