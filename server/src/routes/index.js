const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.send("Festify API - API");
});

router.use(AuthMiddleware.extractHeaders);

router.use("/config", require("./config"));
router.use("/auth", require("./auth"));
router.use("/events", require("./event"));
router.use("/organisations", require("./organisation"));
router.use("/participants", require("./participant"));

module.exports = router;
