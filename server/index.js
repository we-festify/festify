const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socketio = require("socket.io");
require("dotenv").config();

const app = express();

// home route
app.get("/", async (req, res) => {
  res.send(`Festify API - Home<br/>User Agent: ${req.headers["user-agent"]}`);
});

// connect to database
require("./database");

// cors
const corsOptions = {
  credentials: true,
  origin: process.env.ALLOWED_CLIENTS.split(","),
};
app.use(cors(corsOptions));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// request logger
app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  next();
});

// JSON query middleware
const JSONQueryMiddleware = require("./src/middlewares/json-query");
app.use(JSONQueryMiddleware("q"));

// routes
app.use("/api", require("./src/routes/index.js"));

// error handler
const { handleErrors } = require("./src/utils/errors");
app.use(handleErrors);

// create server and socket
const server = http.createServer(app);
const io = socketio(server);

// socket init
require("./src/sockets")(io);

// server port
const PORT = process.env.PORT || 5000;

// listen on port
server.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
