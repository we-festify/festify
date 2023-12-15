const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const APPLICATION_MONGO_URI = process.env.APPLICATION_MONGO_URI;
const ANALYTICS_MONGO_URI = process.env.ANALYTICS_MONGO_URI;

const applicationDB = mongoose.createConnection(APPLICATION_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
applicationDB.on("error", console.error.bind(console, "connection error:"));
applicationDB.once("open", () => {
  console.log("Connected to application database");
});

const analyticsDB = mongoose.createConnection(ANALYTICS_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
analyticsDB.on("error", console.error.bind(console, "connection error:"));
analyticsDB.once("open", () => {
  console.log("Connected to analytics database");
});

module.exports = { applicationDB, analyticsDB };
