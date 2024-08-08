const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { WebSocketServer } = require("ws");
require("dotenv").config();

const app = express();

// home route
app.get("/", async (req, res) => {
  res.send(`Festify API - Home<br/>User Agent: ${req.headers["user-agent"]}`);
});

// connect to database
require("./database");

// init permissions
const RBACService = require("./src/services/rbac");
RBACService.initPermissions(() => {
  console.log("Permissions initialised");
});

// init feature flags
const FeatureFlagService = require("./src/services/featureFlag");
FeatureFlagService.initFeatureFlags(() => {
  console.log("Feature flags initialised");
});

// cors
const corsOptions = {
  credentials: true,
  origin: process.env.ALLOWED_ORIGINS.split(","),
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
const wss = new WebSocketServer({ server });

// socket init
require("./src/sockets")(wss);

// worker init
require("./src/workers");

// server port
const PORT = process.env.PORT || 5000;

// listen on port
server.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});

// export wss for global socket usage
module.exports = { wss };
