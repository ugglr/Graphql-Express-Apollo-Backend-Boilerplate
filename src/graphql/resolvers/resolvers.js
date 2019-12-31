// User Related resolvers
import { createUser, users, findUserByEmail } from "./users";

export const resolvers = {
  Query: { users, findUserByEmail },
  Mutation: { createUser }
};
