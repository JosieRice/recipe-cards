import db from "../firestore";

// TODO: get a response code for responses? or just hard code them?
const editRecipe = async (
  _: null,
  args: {
    collection: string;
    id: string;
    imageUrl: string;
    recipeName: string;
    description: string;
    prepTime: string;
    cookTime: string;
    ingredients: string[];
    prepInstructions: string[];
    cookInstructions: string[];
  }
) => {
  const {
    collection,
    id,
    imageUrl,
    recipeName,
    description,
    prepTime,
    cookTime,
    ingredients,
    prepInstructions,
    cookInstructions
  } = args;

  if (collection === "original") {
    return {
      code: "todo",
      success: false,
      message: "You cannot update an original recipe."
    };
  }

  const result = db
    .collection(collection)
    .doc(id)
    .update({
      recipeName,
      imageUrl,
      description,
      prepTime,
      cookTime,
      ingredients,
      prepInstructions,
      cookInstructions,
      dateUpdated: Date.now()
    });

  // TODO: result is always a promise so it never returns an error.
  if (!result) {
    return {
      code: "todo",
      success: false,
      message: "Failed to update recipe"
    };
  }

  // TODO: this updated recipe should probably come from the database or update response. not sure how to do that in firestore
  const recipe = {
    collection,
    id,
    imageUrl,
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
