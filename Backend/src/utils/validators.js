const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
const isPositiveNumber = (value) => Number.isFinite(Number(value)) && Number(value) > 0;
const isNonNegativeNumber = (value) => Number.isFinite(Number(value)) && Number(value) >= 0;
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));

function requireFields(data, fields) {
  const missing = fields.filter((field) => {
    const value = data[field];
    return value === undefined || value === null || (typeof value === "string" && value.trim() === "");
  });
  if (missing.length) throw new Error(`Missing required fields: ${missing.join(", ")}`);
}

module.exports = { isNonEmptyString, isPositiveNumber, isNonNegativeNumber, isValidEmail, requireFields };
