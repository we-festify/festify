const { WebSocketServer } = require("ws");
const router = require("./routes");

/**
 * Web Socket API
 * @param {WebSocketServer} wss
 */
module.exports = function (wss) {
  // socket connection
  wss.on("connection", (socket) => {
    // socket error
    socket.on("error", (err) => {
      console.error("Web Socket error:", err);
    });

    // socket close
    socket.on("close", () => {
      // no action for now
    });

    // socket message
    socket.on("message", function (message) {
      try {
        try {
          var [type, payload] = JSON.parse(message);
        } catch (err) {
          throw new Error("Invalid message format");
        }
        router.handle(type, payload, socket, wss);
      } catch (err) {
        socket.send(JSON.stringify(["error", err.message]));
      }
    });
  });
};
