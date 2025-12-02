const { gql } = require('apollo-server');

module.exports = gql`
  type Queue {
    id: ID!
    name: String!
    waitingCount: Int!
  }

  type Query {
    queues: [Queue!]!
  }
`;
