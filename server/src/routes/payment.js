const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/payment");
const AuthMiddleware = require("../middlewares/auth");

router.post("/verify", PaymentController.verify);
router.get(
  "/me",
  AuthMiddleware.requireLoggedIn,
  PaymentController.getPaymentsBySelf
);

module.exports = router;
