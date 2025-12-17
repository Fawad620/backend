import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../database/db.js";
import chatRoutes from "../routes/chatRoutes.js";

dotenv.config();
connectDB(); // Make sure your connectDB is serverless compatible

const app = express();

app.use(express.json());

app.use(cors({
  origin: "https://chat-frontend-khaki.vercel.app",
  methods: ["GET", "POST"],
  credentials: true
}));

// Routes
app.use("/api/chat", chatRoutes);

// Health check
app.get("/", (req, res) => {
  res.status(200).send("Backend running 🚀");
});

// ❌ DO NOT USE app.listen()
// ✅ EXPORT APP
export default app;
