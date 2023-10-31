const express = require("express");
const router = express.Router();
const OrganisationController = require("../controllers/organisation");
const { checkLoggedIn } = require("../middlewares/auth");
const { checkPermission } = require("../middlewares/rbac");

router.post(
  "/",
  checkLoggedIn,
  checkPermission("organisation", "create"),
  OrganisationController.create
);
router.get(
  "/:id",
  checkLoggedIn,
  checkPermission("organisation", "read"),
  OrganisationController.getById
);
router.get(
  "/",
  checkLoggedIn,
  checkPermission("organisation", "read"),
  OrganisationController.getAll
);
router.put(
  "/:id",
  checkLoggedIn,
  checkPermission("organisation", "update"),
  OrganisationController.updateById
);
router.delete(
  "/:id",
  checkLoggedIn,
  checkPermission("organisation", "delete"),
  OrganisationController.deleteById
);

module.exports = router;
