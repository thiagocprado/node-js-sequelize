const express = require("express");
const ClassController = require("../controllers/ClassController");
const router = express.Router();

router.route("/").get(ClassController.get).post(ClassController.create);

router
  .route("/:id")
  .get(ClassController.getById)
  .put(ClassController.update)
  .delete(ClassController.destroy);

module.exports = router;
