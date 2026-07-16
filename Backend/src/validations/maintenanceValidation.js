const { requireFields, isPositiveNumber } = require("../utils/validators");
const { normalizeEnum, toNumber } = require("../utils/helpers");
const { MAINTENANCE_STATUSES } = require("../utils/constants");

function maintenanceValidation(data, partial = false) {
  if (!partial) requireFields(data, ["serviceType", "cost", "vehicleId"]);
  const result = { ...data };
  for (const field of ["cost", "vehicleId"]) {
    if (result[field] !== undefined) {
      if (!isPositiveNumber(result[field])) throw new Error(`${field} must be greater than zero`);
      result[field] = toNumber(result[field], field);
    }
  }
  if (result.status !== undefined) {
    result.status = normalizeEnum(result.status);
    if (!MAINTENANCE_STATUSES.includes(result.status)) throw new Error("Invalid maintenance status");
  }
  return result;
}

module.exports = maintenanceValidation;
