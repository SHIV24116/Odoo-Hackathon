const driverService = require("../services/driverService");

const createDriver = async (req, res) => {
    try {
        const driver = await driverService.createDriver(req.body);
        res.status(201).json(driver);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getDrivers = async (req, res) => {
    try {
        const drivers = await driverService.getDrivers();
        res.json(drivers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createDriver,
    getDrivers,
};
