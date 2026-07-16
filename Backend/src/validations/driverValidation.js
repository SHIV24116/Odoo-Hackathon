const { requireFields, isNonNegativeNumber } = require("../utils/validators");
const { normalizeEnum, toDate, toNumber } = require("../utils/helpers");
const { DRIVER_STATUSES } = require("../utils/constants");

function driverValidation(data, partial = false) {
  if (!partial) requireFields(data, ["name", "licenseNumber", "licenseCategory", "licenseExpiry", "contactNumber", "safetyScore"]);
  const result = { ...data };
  if (result.licenseNumber !== undefined) {
    result.licenseNumber = String(result.licenseNumber).trim().toUpperCase();
    if (!result.licenseNumber) throw new Error("licenseNumber is required");
  }
  if (result.licenseExpiry !== undefined) result.licenseExpiry = toDate(result.licenseExpiry, "licenseExpiry");
  if (result.safetyScore !== undefined) {
    if (!isNonNegativeNumber(result.safetyScore) || Number(result.safetyScore) > 100) throw new Error("safetyScore must be between 0 and 100");
    result.safetyScore = Math.round(toNumber(result.safetyScore, "safetyScore"));
  }
  if (result.status !== undefined) {
    result.status = normalizeEnum(result.status);
    if (!DRIVER_STATUSES.includes(result.status)) throw new Error("Invalid driver status");
  }
  return result;
}

module.exports = driverValidation;
