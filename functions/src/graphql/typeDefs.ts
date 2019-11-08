import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Recipe {
    id: ID!
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

  type User {
    id: ID!
    email: String!
  }

  type RecipeUpdateResponse {
    success: Boolean!
    message: String
    recipe: Recipe
  }

  type Query {
    recipes(collection: String!): [Recipe]
    recipe(id: ID!): Recipe
    # Queries for the current user
    me: User
  }

  type Mutation {
    # if false, edit recipe failed -- check errors
    editRecipe(id: ID!): RecipeUpdateResponse!

    # if false, create recipe failed -- check errors
    createRecipe(userId: ID!): RecipeUpdateResponse!

    login(email: String): String # login token
  }
`;

export default typeDefs;
