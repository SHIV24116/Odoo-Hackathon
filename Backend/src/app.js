const express = require("express");
const cors = require("cors");
const authenticate = require("./middleware/authMiddleware");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(",") : true }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.json({ success: true, message: "TransitOps Backend Running" }));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/vehicles", authenticate, require("./routes/vehicleRoutes"));
app.use("/api/drivers", authenticate, require("./routes/driverRoutes"));
app.use("/api/trips", authenticate, require("./routes/tripRoutes"));
app.use("/api/maintenance", authenticate, require("./routes/maintenanceRoutes"));
app.use("/api/expenses", authenticate, require("./routes/expenseRoutes"));
app.use("/api/reports", authenticate, require("./routes/reportRoutes"));
app.use(notFound);
app.use(errorHandler);

module.exports = app;
