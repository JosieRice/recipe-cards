import db from "../firestore";

// TODO: pass in all of the fields you can edit to this mutation and get working on graphql
// TODO: update typeDef for all the variables that are passed here
// TODO: get a response code for responses? or just hard code them?
const editRecipe = async (
  _: null,
  args: { collection: string; id: string }
) => {
  const result = db
    .collection(args.collection)
    .doc(args.id)
    .update({
      recipeName: "test",
      description: "",
      imageUrl: "",
      prepTime: "",
      cookTime: "",
      prepInstructions: "",
      cookInstructions: "",
      ingredients: "",
      ownerUid: "",
      displayName: "",
      sourceUrl: "",
      sourceType: "",
      dateUpdated: Date.now()
    });

  if (!result)
    return {
      code: "todo",
      success: false,
      message: "Failed to update recipe"
    };

  const recipe = db
    .collection(args.collection)
    .doc(args.id)
    .get()
    .then((snap: any) => {
      const recipe = snap.data();
      recipe["id"] = args.id;
      return recipe;
    });

  return {
    code: "todo",
    success: true,
    message: "Recipe was updated successfully",
    recipe
  };
};

export default editRecipe;
