const { verifyToken } = require("../utils/jwt");

function authenticate(req, res, next) {
  const [scheme, token] = (req.headers.authorization || "").split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ success: false, message: "Authentication token is required" });
  }

  try {
    req.user = verifyToken(token);
    return next();
  } catch (_) {
    return res.status(401).json({ success: false, message: "Invalid or expired authentication token" });
  }
}

module.exports = authenticate;
