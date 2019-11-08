import db from "../firestore";
import { ApolloError } from "apollo-server-express";

const recipes = (_: null, args: { collection: string }) => {
  return (
    db
      .collection(`${args.collection}`)
      // .limit(5)   // use this limit for pagination or infinite scroll
      .get()
      .then((snap: any) => {
        let list: any = [];
        snap.forEach((recipe: any) => {
          // Adds recipe id's onto the recipe object
          const recipeObj = recipe.data();
          recipeObj["id"] = recipe.id;

          list = [...list, recipeObj];
        });
        return list;
      })
      .catch(function(error: any) {
        console.error("Error adding document: ", error);
        throw new ApolloError(error);
      })
  );
};

export default recipes;
