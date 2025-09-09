const express = require('express');
const router = express.Router();
const Expense = require('../models/expenseSchema');
const authMiddleware = require('../middleware/authMiddleware');



router.get('/',authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




router.post('/',authMiddleware, async (req, res) => {
  const { description, amount,date,category } = req.body;
  if (!description || !amount ) {
    return res.status(400).json({ message: 'Please enter both a description and an amount.' });
  }
  const newExpense = new Expense({
    userId: req.user.id,
    description,
    category,
    amount,
    date:new Date(),

  });
  try {
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id",authMiddleware, async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found." });
    }

    res.status(200).json(deletedExpense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});







module.exports = router;
