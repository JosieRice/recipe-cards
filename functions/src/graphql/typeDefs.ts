import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Recipe {
    id: String
    cookInstructions: [String]
    cookTime: String
    creatorUid: String!
    dateUpdated: Float
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

export default typeDefs;
