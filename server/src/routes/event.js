const express = require("express");
const router = express.Router();
const EventController = require("../controllers/event");

router.post("/", EventController.create);
router.get("/:id", EventController.getById);
router.get("/", EventController.getAll);
router.get("/type/:type", EventController.getAllByType);
router.put("/:id", EventController.updateById);
router.delete("/:id", EventController.deleteById);

module.exports = router;
