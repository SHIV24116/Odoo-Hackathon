const vehicleService = require("../services/vehicleService");

const createVehicle = async (req, res) => {
    try {
        const vehicle = await vehicleService.createVehicle(req.body);
        res.status(201).json(vehicle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getVehicles = async (req, res) => {
    const vehicles = await vehicleService.getVehicles();
    res.json(vehicles);
};

module.exports = {
    createVehicle,
    getVehicles,
};