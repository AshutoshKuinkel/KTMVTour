import { createClient } from "redis";

const redisPort = process.env.REDIS_PORT
  ? Number(process.env.REDIS_PORT)
  : undefined;
if (redisPort !== undefined && Number.isNaN(redisPort)) {
  throw new Error("REDIS_PORT must be a valid number");
}

const redisClient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSKEY,
  socket: {
    host: process.env.REDIS_PUB_ENDPOINT,
    port: redisPort,
  },
});

redisClient.on("error", (err) => console.log("❌ Redis Client Error", err));
redisClient.on("connect", () => console.log("🔌 Connecting to Redis"));
redisClient.on("ready", () => console.log("✅ Redis connected"));

export const initRedis = async () => {
   try {
    await redisClient.connect();
  } catch (error) {
    console.error("❌ Failed to connect to Redis:", error);
    throw error;
  }
};

export default redisClient;
