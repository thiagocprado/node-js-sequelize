const express = require("express");
const PersonController = require("../controllers/PersonController");
const router = express.Router();

router.route("/").get(PersonController.get).post(PersonController.create);
router.route("/actives").get(PersonController.getActives);

router.route("/all").get(PersonController.get);

router
  .route("/:id")
  .get(PersonController.getById)
  .put(PersonController.update)
  .delete(PersonController.destroy);

router.route("/:id/restore").post(PersonController.restore);

router
  .route("/:student_id/registrations")
  .post(PersonController.createRegistration)
  .get(PersonController.getRegistrations);

router
  .route("/:student_id/registrations/:registration_id")
  .get(PersonController.getRegistrationById)
  .put(PersonController.updateRegistration)
  .delete(PersonController.destroyRegistration);

router
  .route("/registrations/:class_id/confirmed")
  .get(PersonController.getRegistrationsByClass);

router.route("/registrations/crowded").get(PersonController.getCrowdedClasses);

router.route("/:student_id/cancel").post(PersonController.cancelPerson);

module.exports = router;
