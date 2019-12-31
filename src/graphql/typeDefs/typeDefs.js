import { gql } from "apollo-server-express";

export const typeDefs = gql`
  #Queries
  type Query {
    ###### USER RELATED QUERIES #########
    users: [User]!
    findUserByEmail(email: String!): User!
  }
  # Mutations
  type Mutation {
    ###### USER RELATED MUTATIONS #######
    # Adds a User to db with the given email and password
    createUser(email: String!, password: String!): User!
  }

  ###### TYPES ##########################

  #User type
  type User {
    _id: ID!
    email: String!
    password: String
  }
`;
