const router = require("express").Router();
const controller = require("../controllers/vehicleController");
const validate = require("../middleware/validateMiddleware");
const vehicleValidation = require("../validations/vehicleValidation");
router.route("/").get(controller.getVehicles).post(validate(vehicleValidation), controller.createVehicle);
router.route("/:id").get(controller.getVehicle).patch(validate((data) => vehicleValidation(data, true)), controller.updateVehicle).delete(controller.deleteVehicle);
module.exports = router;
