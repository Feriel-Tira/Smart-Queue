const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const axios = require("axios");

const typeDefs = gql`
  type Ticket {
    id: ID!
    number: Int!
    userId: String!
    status: String!
  }

  type Query {
    tickets: [Ticket]
  }

  type Mutation {
    createTicket(userId: String!): Ticket
  }
`;

const resolvers = {
  Query: {
    tickets: async () => {
      const res = await axios.get("http://localhost:4001/tickets");
      return res.data;
    }
  },

  Mutation: {
    createTicket: async (_, { userId }) => {
      const res = await axios.post("http://localhost:4001/tickets", {
        userId
      });
      return res.data;
    }
  }
};

async function startServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4500;
  app.listen(PORT, () => {
    console.log(`🚀 Gateway running at http://localhost:${PORT}/graphql`);
  });
}

startServer();
