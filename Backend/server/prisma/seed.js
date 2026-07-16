const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Roles
  await prisma.role.createMany({
    data: [
      { name: "Fleet Manager" },
      { name: "Dispatcher" },
      { name: "Safety Officer" },
      { name: "Financial Analyst" }
    ],
    skipDuplicates: true
  });

  // Vehicles
  await prisma.vehicle.createMany({
    data: [
      {
        registrationNo: "MH12AB1234",
        model: "Tata Ace",
        type: "Mini Truck",
        maxLoadCapacity: 750,
        odometer: 25000,
        acquisitionCost: 650000,
        status: "AVAILABLE"
      },
      {
        registrationNo: "GJ01CD5678",
        model: "Ashok Leyland Dost",
        type: "Truck",
        maxLoadCapacity: 1200,
        odometer: 40000,
        acquisitionCost: 850000,
        status: "AVAILABLE"
      }
    ],
    skipDuplicates: true
  });

  // Drivers
  await prisma.driver.createMany({
    data: [
      {
        name: "Alex",
        licenseNumber: "DL123456",
        licenseCategory: "LMV",
        licenseExpiry: new Date("2030-12-31"),
        contactNumber: "9876543210",
        safetyScore: 95,
        status: "AVAILABLE"
      },
      {
        name: "Rahul",
        licenseNumber: "DL654321",
        licenseCategory: "HMV",
        licenseExpiry: new Date("2029-08-20"),
        contactNumber: "9123456789",
        safetyScore: 91,
        status: "AVAILABLE"
      }
    ],
    skipDuplicates: true
  });

  const managerRole = await prisma.role.findUnique({ where: { name: "Fleet Manager" } });
  const password = await bcrypt.hash("TransitOps@123", 10);
  await prisma.user.upsert({
    where: { email: "manager@transitops.local" },
    update: { name: "Fleet Manager", password, roleId: managerRole.id },
    create: { name: "Fleet Manager", email: "manager@transitops.local", password, roleId: managerRole.id },
  });

  const vehicle = await prisma.vehicle.findUnique({ where: { registrationNo: "MH12AB1234" } });
  const driver = await prisma.driver.findUnique({ where: { licenseNumber: "DL123456" } });
  const existingFuelLog = await prisma.fuelLog.findFirst({ where: { vehicleId: vehicle.id, date: new Date("2026-07-01") } });
  if (!existingFuelLog) {
    await prisma.fuelLog.create({ data: { vehicleId: vehicle.id, liters: 42, cost: 4200, date: new Date("2026-07-01") } });
  }
  const existingExpense = await prisma.expense.findFirst({ where: { vehicleId: vehicle.id, description: "Highway toll" } });
  if (!existingExpense) {
    await prisma.expense.create({ data: { vehicleId: vehicle.id, type: "TOLL", amount: 850, description: "Highway toll", date: new Date("2026-07-02") } });
  }
  const existingTrip = await prisma.trip.findFirst({ where: { source: "Mumbai", destination: "Pune", vehicleId: vehicle.id, driverId: driver.id } });
  if (!existingTrip) {
    await prisma.trip.create({ data: { source: "Mumbai", destination: "Pune", cargoWeight: 500, plannedDistance: 150, status: "COMPLETED", vehicleId: vehicle.id, driverId: driver.id, finalOdometer: 25150, fuelConsumed: 15 } });
  }

  console.log("Database seeded successfully. Demo login: manager@transitops.local / TransitOps@123");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
