const express = require("express");
const LevelController = require("../controllers/LevelController");
const router = express.Router();

router.route("/").get(LevelController.get).post(LevelController.create);

router
  .route("/:id")
  .get(LevelController.getById)
  .put(LevelController.update)
  .delete(LevelController.destroy);

module.exports = router;
