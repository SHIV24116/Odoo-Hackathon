const prisma = require("../config/prisma");

async function getAnalytics() {
  const [vehicles, drivers, trips, fuel, maintenance, expenses] = await Promise.all([
    prisma.vehicle.findMany(), prisma.driver.findMany(), prisma.trip.findMany(), prisma.fuelLog.findMany(), prisma.maintenance.findMany(), prisma.expense.findMany(),
  ]);
  const sum = (items, field) => items.reduce((total, item) => total + item[field], 0);
  const activeVehicles = vehicles.filter((vehicle) => vehicle.status !== "RETIRED");
  const totalFuel = sum(fuel, "liters");
  const totalDistance = sum(trips.filter((trip) => trip.status === "COMPLETED"), "plannedDistance");
  const operationalCost = sum(fuel, "cost") + sum(maintenance, "cost") + sum(expenses, "amount");
  const acquisitionCost = sum(vehicles, "acquisitionCost");
  return {
    fuelEfficiency: totalFuel ? totalDistance / totalFuel : 0,
    fleetUtilization: activeVehicles.length ? (vehicles.filter((vehicle) => vehicle.status === "ON_TRIP").length / activeVehicles.length) * 100 : 0,
    operationalCost,
    vehicleRoi: acquisitionCost ? (-operationalCost / acquisitionCost) * 100 : 0,
    summary: {
      vehicles: vehicles.length, availableVehicles: vehicles.filter((vehicle) => vehicle.status === "AVAILABLE").length,
      activeTrips: trips.filter((trip) => trip.status === "DISPATCHED").length,
      driversOnDuty: drivers.filter((driver) => driver.status === "ON_TRIP").length,
      totalFuelCost: sum(fuel, "cost"), totalMaintenanceCost: sum(maintenance, "cost"), totalExpenseCost: sum(expenses, "amount"),
    },
  };
}

module.exports = { getAnalytics };
