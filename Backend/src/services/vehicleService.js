const prisma = require("../config/prisma");

const createVehicle = async (data) => {
    return await prisma.vehicle.create({ data });
};

const getVehicles = async () => {
    return prisma.vehicle.findMany({ orderBy: { id: "desc" } });
};

const getVehicle = async (id) => prisma.vehicle.findUniqueOrThrow({ where: { id: Number(id) } });

const updateVehicle = async (id, data) => prisma.vehicle.update({ where: { id: Number(id) }, data });

const deleteVehicle = async (id) => {
    const vehicle = await getVehicle(id);
    const [trips, maintenances, fuelLogs, expenses] = await Promise.all([
        prisma.trip.count({ where: { vehicleId: vehicle.id } }),
        prisma.maintenance.count({ where: { vehicleId: vehicle.id } }),
        prisma.fuelLog.count({ where: { vehicleId: vehicle.id } }),
        prisma.expense.count({ where: { vehicleId: vehicle.id } }),
    ]);
    if (trips + maintenances + fuelLogs + expenses) throw new Error("Vehicle cannot be deleted because it has related operational records");
    return prisma.vehicle.delete({ where: { id: vehicle.id } });
};

module.exports = {
    createVehicle,
    getVehicles,
    getVehicle,
    updateVehicle,
    deleteVehicle,
};
