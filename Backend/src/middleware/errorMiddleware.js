function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

function errorHandler(error, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(error);
  if (res.headersSent) return next(error);
  const prismaCode = error.code;
  const status = prismaCode === "P2002" ? 409 : prismaCode === "P2025" ? 404 : 500;
  return res.status(status).json({ success: false, message: status === 500 ? "Internal server error" : error.message });
}

module.exports = { notFound, errorHandler };
