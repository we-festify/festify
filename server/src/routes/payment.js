const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/payment");
const AuthMiddleware = require("../middlewares/auth");
const RBACMiddleware = require("../middlewares/rbac");

router.post("/verify", PaymentController.verify);
router.get(
  "/me",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("payment:read"),
  PaymentController.getPaymentsBySelf
);
router.get(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("payment:read"),
  PaymentController.getPaymentById
);

module.exports = router;
