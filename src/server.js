import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
// Resolvers and TypeDefs
import { resolvers } from "./Graphql/resolvers/resolvers";
import { typeDefs } from "./Graphql/typeDefs/typeDefs";

const startServer = async () => {
  console.log("[Server] Creating Express Server");
  const app = express();

  console.log("[Server] Creating ApolloServer");
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  console.log("[Server] Applying middlewares");
  server.applyMiddleware({ app });

  // Connect MongoDB with mongoose
  // Change process.env variables in nodemon.json
  console.log("[Server] Connecting to MongoDB");
  await mongoose
    .connect(`mongodb://localhost:27017/${process.env.MONGO_DB}`, {
      useNewUrlParser: true
    })
    .then(
      app.listen({ port: 4000 }, () =>
        console.log(
          `Server ready at http://localhost:4000${server.graphqlPath}`
        )
      )
    )
    .catch(err => console.log(err));
};

startServer();
