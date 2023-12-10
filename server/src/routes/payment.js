const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/payment");

router.post("/verify", PaymentController.verify);

module.exports = router;
