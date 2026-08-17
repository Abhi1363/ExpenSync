import express from 'express';
import Expense from '../models/expenseSchema.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// routes/expenses.js
router.get("/", authMiddleware, async (req, res) => {
  try {
    const search = req.query.search || "";

    let query = { userId: req.user.id };
    if (search) {
      query = {
        userId: req.user.id,
        $or: [
          { description: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } }
        ]
      };
    }

    const expenses = await Expense.find(query).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
