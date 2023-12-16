module.exports = function (io) {
  // socket connection
  io.on("connection", (socket) => {
    console.log("New socket connection:", socket.id);

    // socket disconnection
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
