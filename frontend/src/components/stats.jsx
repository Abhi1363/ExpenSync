import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

import ExpensePie from "./StatsComponents/piecharts";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import Footer from "./footer";
import Sidebar from "./sidebar";
import './stats.css';

const Stats = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token"); // or auth.token
      const res = await axios.get("http://localhost:3000/api/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(res.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);


  const categoryTotals = expenses.reduce((acc, exp) => {
    if (!acc[exp.category]) {
      acc[exp.category] = 0;
    }
    acc[exp.category] += exp.amount;
    return acc;
  }, {});
  const lineChartData = Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount
  }));

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const weeklyData = weekdays.map(day => ({ day, amount: 0 }));

  expenses.forEach(exp => {
    const date = new Date(exp.date);
    const dayIndex = date.getDay(); // 0 = Sun
    weeklyData[dayIndex].amount += exp.amount;
  });

  // Additional KPIs
  const totalSpentAll = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const avgPerExpense = expenses.length ? (totalSpentAll / expenses.length).toFixed(2) : 0;
  const topCategory = Object.entries(categoryTotals).sort((a,b)=>b[1]-a[1])[0]?.[0] || '—';

  return (
<>
    <div style={{display:"flex"}}>
    <Sidebar />

    <div className="stats-container">
      <div className="kpi-row">
        <div className="kpi-card">
          <h4>Total Spent</h4>
          <div className="value">₹{totalSpentAll.toLocaleString()}</div>
        </div>
        <div className="kpi-card">
          <h4>Avg / Expense</h4>
          <div className="value">₹{avgPerExpense}</div>
        </div>
        <div className="kpi-card">
          <h4>Top Category</h4>
          <div className="value">{topCategory}</div>
        </div>
      </div>

      <div className="chart-panel" >
        <h3 className="chart-title" >Individual Expenses</h3>
        <ExpensePie expenses={expenses} />
      </div>

      <div className="chart-panel">
        <h3 className="chart-title">Category wise spending line graph</h3>
        <ResponsiveContainer width="100%" height={320} >
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#4CAF50" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-panel">
        <h3 className="chart-title">Weekly Spending Trend</h3>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={weeklyData}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="amount" stroke="#4CAF50" fillOpacity={1} fill="url(#colorAmount)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>

</div>
<Footer></Footer>
</>
  );
};

export default Stats;
