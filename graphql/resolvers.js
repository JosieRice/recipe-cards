const db = require("./services/firestore");

const resolvers = {
  Query: {
    recipes: () => {
      return (
        db
          .collection("original")
          // .limit(5)   // use this limit for pagination or infinite scroll
          .get()
          .then(snap => {
            let list = [];
            snap.forEach(recipe => {
              // Adds recipe id's onto the recipe object
              let recipeObj = recipe.data();
              recipeObj["id"] = recipe.id;

              list = [...list, recipeObj];
            });
            // console.log("LIST: ", list);
            return list;
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          })
      );
    }
  }
};

module.exports = resolvers;
