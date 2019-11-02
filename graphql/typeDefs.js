const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Recipe {
    cookInstructions: [String]
    cookTime: String
    creatorUid: String!
    dateUpdated: Int
    description: String
    displayName: String
    imageUrl: String
    ingredients: [String]
    prepInstructins: [String]
    prepTime: String
    recipeName: String
    sourceType: String
    sourceUrl: String
  }

  type Query {
    recipes: [Recipe]
  }
`;

module.exports = typeDefs;
