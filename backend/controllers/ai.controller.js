import { chatWithAI } from "../services/chat.service.js";
import { getExpenseCollection } from "../services/chroma.service.js";


export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const reply = await chatWithAI(message);

    res.json({
      success: true,
      reply,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const testCollection = async (req, res) => {
  try {
    const collection = await getExpenseCollection();

    res.json({
      success: true,
      name: collection.name,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};