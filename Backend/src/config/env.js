const required = ["DATABASE_URL", "JWT_SECRET"];

function validateEnv() {
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

module.exports = { validateEnv };
