import { createServer } from "http";
import cron from "node-cron";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { createApp } from "./app";
import { connectDB } from "./lib/db";
import { initializeSocket } from "./lib/socket";

dotenv.config();

const app = createApp();
const PORT = process.env.PORT || 3001;
const httpServer = createServer(app);

try {
  initializeSocket(httpServer);

  // Cron job to clean temp directory
  const tempDir = path.join(process.cwd(), "tmp");
  cron.schedule("0 * * * *", () => {
    if (fs.existsSync(tempDir)) {
      fs.readdir(tempDir, (err, files) => {
        if (err) {
          console.error("Cron error", err);
          return;
        }
        for (const file of files) {
          fs.unlink(path.join(tempDir, file), (err) => {
            if (err) console.error("Cron unlink error", err);
          });
        }
      });
    }
  });

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB().catch((err) => {
      console.error("Failed to connect to MongoDB", err);
      process.exit(1);
    });
  });
} catch (err) {
  console.error("Server startup error:", err);
  process.exit(1);
}