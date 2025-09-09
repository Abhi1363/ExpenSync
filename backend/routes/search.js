const express = require("express");
const Expense = require("../models/expenseSchema");

const router = express.Router();

// routes/expenses.js
router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";

    let query = {};
    if (search) {
      query = {
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


module.exports = router;
