const tripService = require("../services/tripService");

const createTrip = async (req, res) => {
    try {
        const trip = await tripService.createTrip(req.body);
        res.status(201).json(trip);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

const getTrips = async (req, res) => {
    try {
        const trips = await tripService.getTrips();
        res.json(trips);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    createTrip,
    getTrips,
};