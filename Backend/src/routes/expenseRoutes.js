const router = require("express").Router();
const controller = require("../controllers/expenseController");
const validate = require("../middleware/validateMiddleware");
const { expenseValidation, fuelValidation } = require("../validations/expenseValidation");
router.route("/").get(controller.getExpenses).post(validate(expenseValidation), controller.createExpense);
router.route("/fuel").get(controller.getFuelLogs).post(validate(fuelValidation), controller.createFuelLog);
router.delete("/fuel/:id", controller.deleteFuelLog);
router.route("/:id").get(controller.getExpense).patch(validate((data) => expenseValidation(data, true)), controller.updateExpense).delete(controller.deleteExpense);
module.exports = router;
