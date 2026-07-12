const { PrismaClient } = require("@prisma/client");

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

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });