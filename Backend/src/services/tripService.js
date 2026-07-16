const prisma = require("../config/prisma");

const createTrip = async (data) => {
    return prisma.$transaction(async (tx) => {
        const [vehicle, driver] = await Promise.all([
            tx.vehicle.findUniqueOrThrow({ where: { id: data.vehicleId } }),
            tx.driver.findUniqueOrThrow({ where: { id: data.driverId } }),
        ]);
        if (vehicle.status !== "AVAILABLE") throw new Error("Vehicle is not available for dispatch");
        if (driver.status !== "AVAILABLE") throw new Error("Driver is not available for dispatch");
        if (driver.licenseExpiry <= new Date()) throw new Error("Driver license has expired");
        if (data.cargoWeight > vehicle.maxLoadCapacity) throw new Error("Cargo weight exceeds vehicle load capacity");
        const trip = await tx.trip.create({ data: { ...data, status: data.status || "DISPATCHED" }, include: { vehicle: true, driver: true } });
        if (trip.status === "DISPATCHED") {
            await Promise.all([
                tx.vehicle.update({ where: { id: vehicle.id }, data: { status: "ON_TRIP" } }),
                tx.driver.update({ where: { id: driver.id }, data: { status: "ON_TRIP" } }),
            ]);
        }
        return trip;
    });
};

const getTrips = async () => {
    return prisma.trip.findMany({
        include: {
            vehicle: true,
            driver: true,
        },
        orderBy: { createdAt: "desc" },
    });
};

const getTrip = (id) => prisma.trip.findUniqueOrThrow({ where: { id: Number(id) }, include: { vehicle: true, driver: true } });

const updateTrip = async (id, data) => prisma.$transaction(async (tx) => {
    const existing = await tx.trip.findUniqueOrThrow({ where: { id: Number(id) } });
    const trip = await tx.trip.update({ where: { id: existing.id }, data, include: { vehicle: true, driver: true } });
    if (["COMPLETED", "CANCELLED"].includes(trip.status) && ["DRAFT", "DISPATCHED"].includes(existing.status)) {
        await Promise.all([
            tx.vehicle.update({ where: { id: trip.vehicleId }, data: { status: "AVAILABLE", ...(trip.finalOdometer ? { odometer: trip.finalOdometer } : {}) } }),
            tx.driver.update({ where: { id: trip.driverId }, data: { status: "AVAILABLE" } }),
        ]);
    }
    return trip;
});

const deleteTrip = (id) => prisma.trip.delete({ where: { id: Number(id) } });

module.exports = {
    createTrip,
    getTrips,
    getTrip,
    updateTrip,
    deleteTrip,
};
