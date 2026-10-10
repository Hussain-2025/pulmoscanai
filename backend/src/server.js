const app = require("./app");
const env = require("./config/env");
const connectDB = require("./config/db");

async function startServer() {
  try {
    await connectDB();

    app.listen(env.port, () => {
      console.log(`Backend running on http://localhost:${env.port}`);
      console.log(`Swagger docs: http://localhost:${env.port}/api-docs`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();