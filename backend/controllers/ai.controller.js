import { chatWithAI } from "../services/chat.service.js";
import { getExpenseCollection } from "../services/chroma.service.js";
import { retrieveExpenses } from "../services/retriever.service.js";

export const chat = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user?.id;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user ID is missing",
      });
    }

    console.log(req.user);
    console.log("User ID:", userId);

    const reply = await chatWithAI(message, userId);

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
}

  export const search = async (req, res) => {
    try {
        const { query, userId } = req.body;

        const result = await retrieveExpenses(query, userId);

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
};
;