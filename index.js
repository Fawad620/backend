import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
//router
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.use(cors({
  origin: "https://chat-frontend-khaki.vercel.app/", // Replace with your frontend port
}));
