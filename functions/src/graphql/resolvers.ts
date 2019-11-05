import db from "./firestore";

const resolvers = {
  Query: {
    recipes: () => {
      return (
        db
          .collection("original")
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
            // console.log("LIST: ", list);
            return list;
          })
          .catch(function(error: any) {
            console.error("Error adding document: ", error);
          })
      );
    }
  }
};

export default resolvers;
