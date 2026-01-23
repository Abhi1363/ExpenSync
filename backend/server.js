const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userInfoRoutes = require("./routes/userInfo");
const expensesRoutes = require("./routes/Expenses");
const dotenv = require('dotenv');
const path = require('path');
const search= require("./routes/search")
dotenv.config({ path: path.resolve(__dirname, '.env') });

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
