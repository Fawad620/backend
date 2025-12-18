import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from "../models/Chat.js";

// Initialize the client once (can be outside the function)
const genAI = new GoogleGenerativeAI('AIzaSyBcs9XOX-wjx1fcVki9S3-7XtRR0ISnOfw');

export const chatWithGemini = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    // Get the model instance
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Generate content
    const result = await model.generateContent(message);
    const reply = result.response.text();

    // Save to database
    await Chat.create({ message, reply });
    
    res.json({ reply });

  } catch (error) {
    console.error("FULL ERROR:", error.message);
    res.status(500).json({
      error: "Gemini API failed",
      details: error.message
    });
  }
};