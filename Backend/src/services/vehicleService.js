const prisma = require("../config/prisma");

const createVehicle = async (data) => {
    return await prisma.vehicle.create({ data });
};

const getVehicles = async () => {
    return await prisma.vehicle.findMany();
};

module.exports = {
    createVehicle,
    getVehicles,
};