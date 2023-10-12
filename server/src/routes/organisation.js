const express = require("express");
const router = express.Router();
const OrganisationController = require("../controllers/organisation");

router.post("/", OrganisationController.create);
router.get("/:id", OrganisationController.getById);
router.get("/", OrganisationController.getAll);
router.put("/:id", OrganisationController.updateById);
router.delete("/:id", OrganisationController.deleteById);

module.exports = router;
