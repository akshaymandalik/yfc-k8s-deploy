import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { connectDB, disconnectDB } from "./models/connection.js";
import authRoutes from "./routers/auth.routes.js";
import cors from "cors";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, "config/.env"),
});

const PORT = process.env.PORT || 5001;
const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.json({ mes: "Server is up and Running" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    name: err.name || "ServerError",
    errors: err.errors || ["Something went wrong"],
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
  connectDB();
});

const shutdown = (signal) => {
  console.log(`${signal} received, shutting down...`);

  server.close(async () => {
    // 1. close the Mongoose connection here
    disconnectDB;
    // 2. then exit with code 0
    process.exit(0);
  });

  // safety net: force exit if something hangs
  setTimeout(() => process.exit(1), 8000).unref();
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
