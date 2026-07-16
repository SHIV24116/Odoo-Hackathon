const router = require("express").Router();
const controller = require("../controllers/maintenanceController");
const validate = require("../middleware/validateMiddleware");
const maintenanceValidation = require("../validations/maintenanceValidation");
router.route("/").get(controller.getMaintenances).post(validate(maintenanceValidation), controller.createMaintenance);
router.route("/:id").get(controller.getMaintenance).patch(validate((data) => maintenanceValidation(data, true)), controller.updateMaintenance).delete(controller.deleteMaintenance);
module.exports = router;
