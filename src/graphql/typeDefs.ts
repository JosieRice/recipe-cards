import gql from "graphql-tag";

const typeDefs = gql`
  # extend type Query {
  #   recipe: {
  #     draft: string
  #   }
  # }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [Launch]
  }
`;

export default typeDefs;
