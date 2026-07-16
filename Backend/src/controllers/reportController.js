const reportService = require("../services/reportService");
const getAnalytics = async (req, res, next) => { try { res.json(await reportService.getAnalytics()); } catch (err) { next(err); } };
module.exports = { getAnalytics };
