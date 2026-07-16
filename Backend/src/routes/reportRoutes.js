const router = require("express").Router();
const { getAnalytics } = require("../controllers/reportController");
router.get("/analytics", getAnalytics);
module.exports = router;
