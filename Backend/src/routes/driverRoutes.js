const router = require("express").Router();
const controller = require("../controllers/driverController");
const validate = require("../middleware/validateMiddleware");
const driverValidation = require("../validations/driverValidation");
router.route("/").get(controller.getDrivers).post(validate(driverValidation), controller.createDriver);
router.route("/:id").get(controller.getDriver).patch(validate((data) => driverValidation(data, true)), controller.updateDriver).delete(controller.deleteDriver);
module.exports = router;
