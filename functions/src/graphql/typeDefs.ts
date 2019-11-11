import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Recipe {
    id: ID!
    cookInstructions: [String]
    cookTime: String
    creatorUid: String
    dateUpdated: Float
    description: String
    displayName: String
    imageUrl: String
    ingredients: [String]
    prepInstructions: [String]
    prepTime: String
    recipeName: String
    sourceType: String
    sourceUrl: String
  }

  type User {
    id: ID!
    email: String!
  }

  type MutationResponse {
    code: String
    success: Boolean!
    message: String
    recipe: Recipe
  }

  type Query {
    recipes(collection: String!): [Recipe]
    recipe(collection: String!, id: ID!): Recipe
    # Queries for the current user
    me: User
  }

  type Mutation {
    # edit existing recipe
    editRecipe(
      id: ID!
      collection: String!
      recipeName: String
      description: String
      prepTime: String
      cookTime: String
      prepInstructions: [String]
      cookInstructions: [String]
      ingredients: [String]
    ): MutationResponse!

    # if false, create recipe failed -- check errors
    createRecipe(userId: ID!): MutationResponse!

    login(email: String): MutationResponse! # login token
  }
`;

export default typeDefs;
