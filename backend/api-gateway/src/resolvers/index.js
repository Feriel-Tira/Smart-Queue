module.exports = {
  Query: {
    queues: async (_, __, { dataSources }) => {
      return dataSources.queueAPI.getQueues();
    }
  }
};
