import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.connect()
  .then(() => console.log("Connected to Redis Cloud"))
  .catch((err) => console.error("Redis Error:", err));

export default redisClient;
