const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Festify API - API");
});

router.use("/config", require("./config"));
router.use("/auth", require("./auth"));
router.use("/events", require("./event"));
router.use("/organisations", require("./organisation"));
router.use("/participants", require("./participant"));

module.exports = router;
