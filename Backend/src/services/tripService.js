const prisma = require("../config/prisma");

const createTrip = async (data) => {
    return await prisma.trip.create({
        data,
        include: {
            vehicle: true,
            driver: true,
        },
    });
};

const getTrips = async () => {
    return await prisma.trip.findMany({
        include: {
            vehicle: true,
            driver: true,
        },
    });
};

module.exports = {
    createTrip,
    getTrips,
};