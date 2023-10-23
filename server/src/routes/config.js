const express = require("express");
const router = express.Router();
const permissions = require("../config/permissions");

router.get("/permissions", (req, res) => {
  res.json({
    permissions,
  });
});

module.exports = router;
