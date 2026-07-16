const prisma = require("../config/prisma");

function duplicateLicenseError() {
    const error = new Error("A driver with this licence number already exists");
    error.code = "P2002";
    return error;
}

async function ensureLicenseIsAvailable(licenseNumber, excludeId) {
    if (!licenseNumber) return;

    const existingDriver = await prisma.driver.findFirst({
        where: {
            licenseNumber: { equals: licenseNumber, mode: "insensitive" },
            ...(excludeId ? { id: { not: excludeId } } : {}),
        },
    });

    if (existingDriver) throw duplicateLicenseError();
}

const createDriver = async (data) => {
    await ensureLicenseIsAvailable(data.licenseNumber);
    return prisma.driver.create({ data });
};

const getDrivers = async () => {
    return prisma.driver.findMany({ orderBy: { id: "desc" } });
};

const getDriver = async (id) => prisma.driver.findUniqueOrThrow({ where: { id: Number(id) } });
const updateDriver = async (id, data) => {
    const driverId = Number(id);
    await ensureLicenseIsAvailable(data.licenseNumber, driverId);
    return prisma.driver.update({ where: { id: driverId }, data });
};
const deleteDriver = async (id) => {
    const driver = await getDriver(id);
    if (await prisma.trip.count({ where: { driverId: driver.id } })) throw new Error("Driver cannot be deleted because they have trip records");
    return prisma.driver.delete({ where: { id: driver.id } });
};

module.exports = {
    createDriver,
    getDrivers,
    getDriver,
    updateDriver,
    deleteDriver,
};
