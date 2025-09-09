import React, { useState, useEffect, useMemo } from "react";
import axios from "../utils/axiosInstance";
import "./MonthlyBudget.css";
import Footer from "./footer";
import Sidebar from "./sidebar";

const MonthlyBudgetTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(
    localStorage.getItem("monthlyBudget")
      ? Number(localStorage.getItem("monthlyBudget"))
      : null
  );
  const [inputBudget, setInputBudget] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/expenses");
        setExpenses(res.data);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };
    fetchExpenses();
  }, []);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyExpenses = useMemo(() => {
    return expenses.filter((exp) => {
      if (!exp.date) return false;
      const expDate = new Date(exp.date);
      return (
        expDate.getMonth() === currentMonth &&
        expDate.getFullYear() === currentYear
      );
    });
  }, [expenses, currentMonth, currentYear]);

  const totalSpent = monthlyExpenses.reduce(
    (sum, exp) => sum + Number(exp.amount || 0),
    0
  );

  const percentage =
    budget && budget > 0 ? Math.min(((totalSpent / budget) * 100).toFixed(1), 100) : 0;

  const remaining = budget ? budget - totalSpent : 0;

  const handleSetBudget = () => {
    if (inputBudget > 0) {
      localStorage.setItem("monthlyBudget", inputBudget); // 🔹 Save to localStorage
      setBudget(Number(inputBudget));
      setInputBudget("");
    }
  };

  const handleResetBudget = () => {
    localStorage.removeItem("monthlyBudget");
    setBudget(null);
  };

  return (
    <>
    <div style={{display:"flex"}}>
   <Sidebar></Sidebar>
    <div className="budget-card">
      <h3 className="budget-title">💰 Monthly Budget Tracker</h3>

      {!budget ? (
        <div className="set-budget">
          <input
            type="number"
            placeholder="Enter monthly limit ₹"
            value={inputBudget}
            onChange={(e) => setInputBudget(e.target.value)}
            className="budget-input"
          />
          <button onClick={handleSetBudget} className="set-btn">
            Set Limit
          </button>
        </div>
      ) : (
        <>
          <div className="progress-bar">
            <div
              className={`progress-fill ${remaining < 0 ? "over-budget" : ""}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <p className="budget-info">
            Spent: <span className="highlight">₹{totalSpent.toLocaleString()}</span> /{" "}
            <span className="highlight">₹{budget.toLocaleString()}</span>
          </p>

          <p className={`budget-status ${remaining < 0 ? "overspent" : "saved"}`}>
            {remaining < 0
              ? `⚠️ Overspent by ₹${Math.abs(remaining).toLocaleString()}`
              : `✅ Saved ₹${remaining.toLocaleString()} this month`}
          </p>

          <div className="btn-group">
            <button onClick={handleResetBudget} className="change-btn">
              ✏️ Change Limit
            </button>
          </div>
        </>
      )}
    </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default MonthlyBudgetTracker;
