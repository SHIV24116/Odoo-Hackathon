const express = require("express");

const app = express();

app.use(express.json());

const vehicleRoutes = require("./routes/vehicleRoutes");
// const driverRoutes = require("./routes/driverRoutes");
// const tripRoutes = require("./routes/tripRoutes");
// const maintenanceRoutes = require("./routes/maintenanceRoutes");
// // const fuelRoutes = require("./routes/fuelRoutes");
// const expenseRoutes = require("./routes/expenseRoutes");

app.use("/vehicles", vehicleRoutes);
// app.use("/drivers", driverRoutes);
// app.use("/trips", tripRoutes);
// app.use("/maintenance", maintenanceRoutes);
// // app.use("/fuel", fuelRoutes);
// app.use("/expenses", expenseRoutes);

module.exports = app;