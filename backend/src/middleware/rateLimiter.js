import { Ratelimit } from '../config/upstash.js';

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await Ratelimit.limit("my-limit-key");
    if (!success) {
      return res.status(429).json({ message: "Too many requests" });
    }
    next();
  } catch (error) {
    console.log("Error in rateLimiter middleware:", error);
    next();
  }
};

export default rateLimiter;