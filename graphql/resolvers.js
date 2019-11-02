// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    recipes: () => recipes
  }
};

module.exports = resolvers;

const recipes = [
  {
    cookInstructions: ["String", "2", "string 3"],
    cookTime: "String",
    creatorUid: "String",
    dateUpdated: 999,
    description: "String",
    displayName: "String",
    imageUrl: "String",
    ingredients: ["ingred1", "ingred2", "ingred3"],
    prepInstructins: ["prep1", "prep2", "prep3"],
    prepTime: "String",
    recipeName: "String",
    sourceType: "String",
    sourceUrl: "String"
  }
];
