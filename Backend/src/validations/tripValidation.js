const { requireFields, isPositiveNumber } = require("../utils/validators");
const { normalizeEnum, toNumber } = require("../utils/helpers");
const { TRIP_STATUSES } = require("../utils/constants");

function tripValidation(data, partial = false) {
  if (!partial) requireFields(data, ["source", "destination", "cargoWeight", "plannedDistance", "vehicleId", "driverId"]);
  const result = { ...data };
  for (const field of ["cargoWeight", "plannedDistance", "vehicleId", "driverId"]) {
    if (result[field] !== undefined) {
      if (!isPositiveNumber(result[field])) throw new Error(`${field} must be greater than zero`);
      result[field] = toNumber(result[field], field);
    }
  }
  for (const field of ["finalOdometer", "fuelConsumed"]) {
    if (result[field] !== undefined && result[field] !== null) {
      if (!isPositiveNumber(result[field])) throw new Error(`${field} must be greater than zero`);
      result[field] = toNumber(result[field], field);
    }
  }
  if (result.status !== undefined) {
    result.status = normalizeEnum(result.status);
    if (!TRIP_STATUSES.includes(result.status)) throw new Error("Invalid trip status");
  }
  return result;
}

module.exports = tripValidation;
