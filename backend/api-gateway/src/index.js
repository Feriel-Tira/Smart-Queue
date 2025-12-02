const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const QueueAPI = require("./datasources/queueAPI");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    queueAPI: new QueueAPI()
  })
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Gateway GraphQL running at ${url}`);
});
