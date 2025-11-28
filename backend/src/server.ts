//imports:
import express, { Request, Response } from "express";
import "dotenv/config";
import { connectmongoDB, postgresPool } from "./config/db.config";
import { errorHandler } from "./middlewares/error-handler.middleware";
import cookieParser from "cookie-parser";
import { initRedis } from "./config/redisClient.config";
import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import process from "node:process";

// initialisations:
const app = express();
const PORT = process.env.PORT;
const mongo_URI = process.env.mongo_URI;
const numCPUs = availableParallelism();

// importing routes:
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import socialRoutes from "./routes/post.routes";
import feedRoutes from "./routes/feed.routes";
import likeRoutes from "./routes/likes.routes";
import commentRoutes from "./routes/comments.routes";

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Connecting to mongoDB
  connectmongoDB(mongo_URI!);
  // testing PostgreSQL connection:
  postgresPool
    .query("SELECT NOW()")
    .then(() => {
      console.log(`PostgreSQL connected`);
    })
    .catch((err) => {
      console.error(`Error connecting to PostgreSQL DB:`, err);
    });
  // redis connection
  initRedis();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // using routes:
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/social", socialRoutes);
  app.use("/api/feed", feedRoutes);
  app.use("/api/social", likeRoutes);
  app.use("/api/social", commentRoutes);

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: `Backend live`,
    });
  });

  app.get("/{*all}", (req: Request, res: Response) => {
    res.status(404).json({
      message: `Cannot ${req.method} @ ${req.url}`,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
  });

  console.log(`Node version: ${process.version}`);
  console.log(`Worker ${process.pid} started`);

  // using error handler:
  app.use(errorHandler);
}
