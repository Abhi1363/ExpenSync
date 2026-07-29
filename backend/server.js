import './loadEnv.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userInfoRoutes from './routes/userInfo.js';
import expensesRoutes from './routes/Expenses.js';
import search from './routes/search.js';
import aiRoutes from './routes/ai.js';

const app = express();
const FRONTEND = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(cors({ origin: FRONTEND, credentials: true }));
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected!!!'))
.catch((err) => console.log(err));  

app.get('/', (req, res) => {
  res.send('Expense Tracker API is running');
});

// Routes
app.use("/api/userInfo", userInfoRoutes);
app.use("/api/expenses", expensesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/search",search)
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
