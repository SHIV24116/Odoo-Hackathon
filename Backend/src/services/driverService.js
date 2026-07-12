const prisma = require("../config/prisma");

const createDriver = async (data) => {
    return await prisma.driver.create({ data });
};

const getDrivers = async () => {
    return await prisma.driver.findMany();
};

module.exports = {
    createDriver,
    getDrivers,
};
