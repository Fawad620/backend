import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

// CORS configuration - Allow all origins
app.use(
  cors({
    origin: "*", // Allow all origins
    credentials: false, // Set to false when allowing all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests explicitly
app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Root endpoint - IMPORTANT!
app.get("/", (req, res) => {
  res.status(200).json({ 
    status: "ok", 
    message: "Chat API Server is running",
    version: "1.0.0"
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Routes
app.use("/api/chat", chatRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found", path: req.path });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : err.message,
  });
});

// Connect to database
connectDB().catch(err => {
  console.error("Database connection failed:", err);
});

// Export for Vercel serverless - THIS IS CRITICAL!
export default app;

// Local development server (won't run on Vercel)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4005;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}