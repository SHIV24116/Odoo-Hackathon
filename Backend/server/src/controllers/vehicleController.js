const prisma = require("../config/prisma");

// Create Vehicle
const createVehicle = async (req, res) => {
  try {
    const vehicle = await prisma.vehicle.create({
      data: req.body,
    });

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Vehicles
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany();

    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Vehicle By ID
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Vehicle
const updateVehicle = async (req, res) => {
  try {
    const vehicle = await prisma.vehicle.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Vehicle
const deleteVehicle = async (req, res) => {
  try {
    await prisma.vehicle.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};