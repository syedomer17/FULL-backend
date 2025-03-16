import express, { Request, Response } from "express";
import config from "config";
import cors from "cors";
import rateLimit from "express-rate-limit";
import publicRouter from "../src/controllers/public/index";
import authMiddleware from "./controllers/middleware/auth";
import userRouter from "./controllers/User/index";
import adminRouter from "./controllers/Admin/index"
import "./utils/dbConnect"

const app = express();
const PORT: number = config.get<number>("PORT") || 5000; // ✅ Ensure it's a number

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json());

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Ek IP se max 100 requests allow hongi
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

app.use("/api/public", publicRouter);

// ✅ **Private Routes Pe Middleware**
app.use(authMiddleware);

app.use("/api/private/user", userRouter);

app.use("/api/private/admin", adminRouter);

app.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "✅ Server is running and working" });
  } catch (error) {
    res.status(500).json({ error: "❌ Internal Server Error" });
  }
});

// 404 Middleware for Unknown Routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "❌ Not Found Router" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
