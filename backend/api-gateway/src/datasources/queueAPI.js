const axios = require("axios");

class QueueAPI {
  constructor() {
    this.baseURL = "http://localhost:4001"; // microservice queue
  }

  async getQueues() {
    const response = await axios.get(`${this.baseURL}/queues`);
    return response.data;
  }
}

module.exports = QueueAPI;
