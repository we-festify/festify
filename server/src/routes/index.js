const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Festify API - API");
});

router.use("/config", require("./config"));
router.use("/auth", require("./auth"));
router.use("/events", require("./event"));
router.use("/organisations", require("./organisation"));
router.use("/teams", require("./team"));
router.use("/registrations", require("./registration"));

module.exports = router;
