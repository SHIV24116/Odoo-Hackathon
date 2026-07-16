const { requireFields, isNonNegativeNumber, isPositiveNumber } = require("../utils/validators");
const { normalizeEnum, toNumber } = require("../utils/helpers");
const { VEHICLE_STATUSES } = require("../utils/constants");

function vehicleValidation(data, partial = false) {
  if (!partial) requireFields(data, ["registrationNo", "model", "type", "maxLoadCapacity", "odometer", "acquisitionCost"]);
  for (const field of ["maxLoadCapacity", "acquisitionCost"]) {
    if (data[field] !== undefined && !isPositiveNumber(data[field])) throw new Error(`${field} must be greater than zero`);
  }
  if (data.odometer !== undefined && !isNonNegativeNumber(data.odometer)) throw new Error("odometer must be zero or greater");
  const result = { ...data };
  for (const field of ["registrationNo", "model", "type"]) {
    if (result[field] !== undefined) result[field] = String(result[field]).trim().toUpperCase();
  }
  ["maxLoadCapacity", "odometer", "acquisitionCost"].forEach((field) => {
    if (result[field] !== undefined) result[field] = toNumber(result[field], field);
  });
  if (result.status !== undefined) {
    result.status = normalizeEnum(result.status);
    if (!VEHICLE_STATUSES.includes(result.status)) throw new Error("Invalid vehicle status");
  }
  return result;
}

module.exports = vehicleValidation;
