import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

import ExpensePie from "./StatsComponents/piecharts"
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import Footer from "./footer";
import Sidebar from "./sidebar";

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



  return (
<>
    <div style={{display:"flex"}}>
    <Sidebar></Sidebar>

    <div style={{ padding: "30px", display: "flex", flexDirection: "column", margin: "auto", alignItems: "center", gap: "50px" }}>

      <ExpensePie expenses={expenses}

        style={{

          margin: "20px auto",
          outerWidth: "50px",
          display: "block",
          border: "2px solid #ccc",
          borderRadius: "12px",
          backgroundColor: "#f9f9f9"
        }}


      />

      <div>
        <h2 style={{ color: "black", marginLeft: "20%" }}>Category wise spending line graph</h2>

        <div style={{ border: "1px solid black", padding: "35px", width: "700px" }}>

          <ResponsiveContainer width="100%" height={300} >
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#4CAF50" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>

        </div>
      </div>
      <div style={{ width: "100%" }}>
        <h2 style={{ color: "black", marginLeft: "20%" }}>Weekly Spending Trend</h2>
    <div style={{ border: "1px solid black", padding: "35px", width: "700px" }}>
          
          <ResponsiveContainer width="100%" height={300}>
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

</div>
<Footer></Footer>
</>
  );
};

export default Stats;
