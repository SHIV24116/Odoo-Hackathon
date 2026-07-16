const prisma = require("../config/prisma");

const createExpense = async (data) => {
  await prisma.vehicle.findUniqueOrThrow({ where: { id: data.vehicleId } });
  return prisma.expense.create({ data, include: { vehicle: true } });
};
const getExpenses = () => prisma.expense.findMany({ include: { vehicle: true }, orderBy: { date: "desc" } });
const getExpense = (id) => prisma.expense.findUniqueOrThrow({ where: { id: Number(id) }, include: { vehicle: true } });
const updateExpense = (id, data) => prisma.expense.update({ where: { id: Number(id) }, data, include: { vehicle: true } });
const deleteExpense = (id) => prisma.expense.delete({ where: { id: Number(id) } });

const createFuelLog = async (data) => {
  await prisma.vehicle.findUniqueOrThrow({ where: { id: data.vehicleId } });
  return prisma.fuelLog.create({ data, include: { vehicle: true } });
};
const getFuelLogs = () => prisma.fuelLog.findMany({ include: { vehicle: true }, orderBy: { date: "desc" } });
const deleteFuelLog = (id) => prisma.fuelLog.delete({ where: { id: Number(id) } });

module.exports = { createExpense, getExpenses, getExpense, updateExpense, deleteExpense, createFuelLog, getFuelLogs, deleteFuelLog };
