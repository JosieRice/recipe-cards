const { ApolloServer } = require('apollo-server-express'),
    typeDefs = require("./typeDefs"),
    resolvers = require("./resolvers");

const apolloServer = new ApolloServer({ 
    typeDefs, 
    resolvers,
    playground: true,
    introspection: true
  });

  module.exports = apolloServer;