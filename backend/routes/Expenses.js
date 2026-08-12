import express from 'express';
import Expense from '../models/expenseSchema.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { storeExpenseVector,deleteExpenseVector } from '../services/chroma.service.js';

const router = express.Router();

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
    const expenseForVector = { ...savedExpense.toObject(), user: savedExpense.userId };
    storeExpenseVector(expenseForVector).catch((err) => {
      console.error('storeExpenseVector failed:', err?.message || err);
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.status(404).json({
        message: "Expense not found."
      });
    }

    await deleteExpenseVector(deletedExpense._id);

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully.",
      deletedExpense
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
})

export default router;
