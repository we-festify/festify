const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

// home route
app.get("/", async (req, res) => {
  // const Mailer = require("./src/services/mailer");
  // await Mailer.sendForgotPasswordMail({
  //   to: "test@gmail.com",
  //   redirectUrl: "http://localhost:3000",
  //   user: {
  //     name: "Test User",
  //   },
  //   organisation: {
  //     name: "Festify",
  //     address: {
  //       street: "123 Main St",
  //       city: "New York",
  //       state: "NY",
  //       zip: "12345",
  //       country: "US",
  //     },
  //   },
  // });
  res.send(`Festify API - Home`);
});

// connect to database
const { connectDB } = require("./database");
connectDB();

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

// routes
app.use("/api", require("./src/routes/index.js"));

// error handler
const { handleErrors } = require("./src/utils/errors");
app.use(handleErrors);

// server port
const PORT = process.env.PORT || 5000;

// listen on port
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
