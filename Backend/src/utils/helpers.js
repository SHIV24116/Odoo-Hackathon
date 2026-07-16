const pick = (source, keys) =>
  keys.reduce((result, key) => {
    if (source[key] !== undefined) result[key] = source[key];
    return result;
  }, {});

const toNumber = (value, field) => {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error(`${field} must be a valid number`);
  return number;
};

const toDate = (value, field) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error(`${field} must be a valid date`);
  return date;
};

const normalizeEnum = (value) => String(value || "").trim().toUpperCase().replace(/[\s-]+/g, "_");

module.exports = { pick, toNumber, toDate, normalizeEnum };
