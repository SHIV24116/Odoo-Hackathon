const router = require("express").Router();
const controller = require("../controllers/tripController");
const validate = require("../middleware/validateMiddleware");
const tripValidation = require("../validations/tripValidation");
router.route("/").get(controller.getTrips).post(validate(tripValidation), controller.createTrip);
router.route("/:id").get(controller.getTrip).patch(validate((data) => tripValidation(data, true)), controller.updateTrip).delete(controller.deleteTrip);
module.exports = router;
