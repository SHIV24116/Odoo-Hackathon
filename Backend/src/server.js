require("dotenv").config();
const { validateEnv } = require("./config/env");
const app = require("./app");

validateEnv();
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
