const Redis = require("ioredis");
const { getClients, getClient } = require("../sockets/clients");

class InAppNotificationWorker {
  constructor() {
    // redis subscriber for notifications
    const subscriber = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      maxRetriesPerRequest: 0,
    });
    subscriber.on("error", (err) => {
      console.error("Redis In App Notifications Subscriber error:", err);
      return subscriber.disconnect();
    });
    subscriber.on("connect", () => {
      console.log("Redis In App Notifications Subscriber connected");
    });
    subscriber.subscribe("NOTIFICATIONS");
    subscriber.on("message", (channel, message) => {
      if (channel !== "NOTIFICATIONS") return;
      const { to } = JSON.parse(message);
      message = JSON.parse(message);
      if (to === "all") {
        return this.#broadcast(message);
      }
      const userIds = Array.isArray(to) ? to : [to];
      for (const userId of userIds) {
        this.#send(userId, message);
      }
    });
    this._subscriber = subscriber;
  }

  /**
   * Send notification to all clients
   * @param {any} payload
   * @returns {void}
   */
  #broadcast = (payload) => {
    for (const client of getClients()) {
      client.send(JSON.stringify(["notification:new", payload]));
    }
  };

  /**
   * Send notification to specific client
   * @param {string} userId
   * @param {any} payload
   * @returns {void}
   */
  #send = (userId, payload) => {
    const client = getClient(userId);
    if (client) {
      client.send(JSON.stringify(["notification:new", payload]));
    }
  };
}

module.exports = new InAppNotificationWorker();
