const createDriver = (req, res) => {
  res.send("Create Driver");
};

const getAllDrivers = (req, res) => {
  res.send("Get All Drivers");
};

const getDriverById = (req, res) => {
  res.send("Get Driver");
};

const updateDriver = (req, res) => {
  res.send("Update Driver");
};

const deleteDriver = (req, res) => {
  res.send("Delete Driver");
};

module.exports = {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
};