const prisma = require("../config/prisma");

const includeVehicle = { vehicle: true };

async function createMaintenance(data) {
  return prisma.$transaction(async (tx) => {
    await tx.vehicle.findUniqueOrThrow({ where: { id: data.vehicleId } });
    const maintenance = await tx.maintenance.create({
      data: { ...data, status: data.status || "ACTIVE", completedAt: data.status === "COMPLETED" ? new Date() : null },
      include: includeVehicle,
    });
    if (maintenance.status === "ACTIVE") await tx.vehicle.update({ where: { id: data.vehicleId }, data: { status: "IN_SHOP" } });
    return maintenance;
  });
}

const getMaintenances = () => prisma.maintenance.findMany({ include: includeVehicle, orderBy: { createdAt: "desc" } });
const getMaintenance = (id) => prisma.maintenance.findUniqueOrThrow({ where: { id: Number(id) }, include: includeVehicle });

async function updateMaintenance(id, data) {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.maintenance.findUniqueOrThrow({ where: { id: Number(id) } });
    const status = data.status || existing.status;
    const maintenance = await tx.maintenance.update({
      where: { id: existing.id },
      data: { ...data, ...(status === "COMPLETED" && existing.status !== "COMPLETED" ? { completedAt: new Date() } : {}) },
      include: includeVehicle,
    });
    if (status === "COMPLETED" && existing.status !== "COMPLETED") {
      const remaining = await tx.maintenance.count({ where: { vehicleId: maintenance.vehicleId, status: "ACTIVE", NOT: { id: maintenance.id } } });
      if (!remaining) await tx.vehicle.update({ where: { id: maintenance.vehicleId }, data: { status: "AVAILABLE" } });
    }
    return maintenance;
  });
}

const deleteMaintenance = (id) => prisma.maintenance.delete({ where: { id: Number(id) } });

module.exports = { createMaintenance, getMaintenances, getMaintenance, updateMaintenance, deleteMaintenance };
