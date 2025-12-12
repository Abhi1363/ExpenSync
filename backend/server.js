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
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/expensync', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected!!!'))
.catch((err) => console.log(err));

// Routes
app.use("/api/userInfo", userInfoRoutes);
app.use("/api/expenses", expensesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/search",search)

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
