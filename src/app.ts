import express, { Express, Request, Response } from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import { errorHandler } from "./middleware/error.middleware";
import userRoutes from "./routes/user.route";
import adminRoutes from "./routes/admin.route";
import authRoutes from "./routes/auth.route";
import songRoutes from "./routes/song.route";
import albumRoutes from "./routes/album.route";
import statRoutes from "./routes/stat.route";
import { HTTP_STATUS } from "./constants/httpStatus";

export const createApp = (): Express => {
  const app = express();

  app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:3001"],
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: path.join(process.cwd(), "tmp"),
      createParentPath: true,
      limits: { fileSize: 10 * 1024 * 1024 },
    })
  );

  // Swagger setup with YAML
  try {
    const swaggerDocument = yaml.load(path.join(process.cwd(), "swagger.yaml"));
    console.log("Swagger YAML loaded successfully");
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (err) {
    console.error("Failed to load swagger.yaml:", err);
  }

  // Routes
  app.use("/api/users", userRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/songs", songRoutes);
  app.use("/api/albums", albumRoutes);
  app.use("/api/stats", statRoutes);

  // Serve frontend in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(process.cwd(), "../frontend/dist")));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.resolve(process.cwd(), "../frontend", "dist", "index.html"));
    });
  }

  // Error handler
  app.use(errorHandler);

  return app;
};