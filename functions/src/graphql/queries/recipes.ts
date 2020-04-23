import db from "../firestore";
import { ApolloError } from "apollo-server-express";

const recipes = (_: null, args: { collection: string }, context: any) => {
  // testing that uid is correct in context
  console.log("RECIPES CONTEXT: ", JSON.stringify(context.uid))
  return (
    db
      .collection(args.collection)
      // .limit(5)   // use this limit for pagination or infinite scroll
      .get()
      .then((snap: any) => {
        let list: any = [];
        snap.forEach((recipe: any) => {
          const recipeObj = recipe.data();
          recipeObj["id"] = recipe.id;

          list = [...list, recipeObj];
        });
        return list;
      })
      .catch(function(error: any) {
        console.error("Error fetching documents: ", error);
        throw new ApolloError(error);
      })
  );
};

export default recipes;
