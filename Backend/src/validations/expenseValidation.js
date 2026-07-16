const { requireFields, isPositiveNumber } = require("../utils/validators");
const { normalizeEnum, toDate, toNumber } = require("../utils/helpers");
const { EXPENSE_TYPES } = require("../utils/constants");

function expenseValidation(data, partial = false) {
  if (!partial) requireFields(data, ["type", "amount", "date", "vehicleId"]);
  const result = { ...data };
  for (const field of ["amount", "vehicleId"]) {
    if (result[field] !== undefined) {
      if (!isPositiveNumber(result[field])) throw new Error(`${field} must be greater than zero`);
      result[field] = toNumber(result[field], field);
    }
  }
  if (result.date !== undefined) result.date = toDate(result.date, "date");
  if (result.type !== undefined) {
    result.type = normalizeEnum(result.type);
    if (!EXPENSE_TYPES.includes(result.type)) result.type = "OTHER";
  }
  return result;
}

function fuelValidation(data, partial = false) {
  if (!partial) requireFields(data, ["liters", "cost", "date", "vehicleId"]);
  const result = { ...data };
  for (const field of ["liters", "cost", "vehicleId"]) {
    if (result[field] !== undefined) {
      if (!isPositiveNumber(result[field])) throw new Error(`${field} must be greater than zero`);
      result[field] = toNumber(result[field], field);
    }
  }
  if (result.date !== undefined) result.date = toDate(result.date, "date");
  return result;
}

module.exports = { expenseValidation, fuelValidation };
