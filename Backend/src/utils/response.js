const success = (res, data, status = 200, message) =>
  res.status(status).json({ success: true, ...(message ? { message } : {}), data });

const failure = (res, message, status = 400, details) =>
  res.status(status).json({ success: false, message, ...(details ? { details } : {}) });

module.exports = { success, failure };
