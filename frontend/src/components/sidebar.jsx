import React, { useState, useEffect } from 'react';
import "./sidebar.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { downloadAllTransactions, downloadTransactionsByDate } from "../utils/DownloadUtils";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg"

const Sidebar = () => {
  const [showTransaction, setShowTransaction] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expenses, setExpenses] = useState([]);

useEffect(() => {
  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/api/expenses", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setExpenses(res.data);
  };
  fetchExpenses();
}, []);

const handleDownload = () => {
  if (expenses.length === 0) {
    console.log("No expenses to download");
    return;
  }
  downloadAllTransactions(expenses);
};

  
const navigate = useNavigate();
  const handleLogout = () => {

    
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      
      localStorage.removeItem("token"); 
      localStorage.removeItem("user"); 

     
      navigate("/login");
    }
  };


  

  return (
    <div className="sidebar">
      <div>
        <div className="logo"><img src={logo}></img>ExpenseSync</div>

        <ul className="menu-section">
          <li className="menu-title">Main Menu</li>
        <li className="menu-item active">
  <Link to="/expenseBox" style={{textDecoration:"none", color:"white"}}>🏠 Dashboard</Link>
</li>
          <li className="menu-item">
             <Link to="/statistics" style={{ textDecoration: "none", color: "#333" }}>📊 Statistics</Link>
          </li>
          <li className="menu-item" onClick={() => setShowTransaction(!showTransaction)}>
          💳 Transaction
            {showTransaction && (
              <ul className="submenu">
                <li onClick={(handleDownload)}>Download all transactions</li>
               

                <li onClick={() => setShowDateFilter(!showDateFilter)}>Download Date wise transactions</li>
              </ul>
            )}
          </li>

          {showDateFilter && (
            <div className="date-filter">
              <input className="date" type="date" onChange={(e) => setStartDate(e.target.value)} />
              <input className="date" type="date" onChange={(e) => setEndDate(e.target.value)} />
              <button
                style={{ border: "none", marginLeft: "30px" }}
                onClick={() => {
                  downloadTransactionsByDate(expenses, startDate, endDate);
                  setShowDateFilter(false);
                }}
              >
                Download
              </button>
            </div>
          )}

          <li className="menu-item">
             <Link to="/monthlyBudget" style={{ textDecoration: "none", color: "#333" }}>💰 Monthly Budget Tracker</Link>
          </li>
         
        </ul>
      </div>

    
      <ul className="menu-section">
        <li className="menu-title">Management</li>
        <li className="menu-item">    <Link to="/help" style={{ textDecoration: "none",   color: "#333" }}>❓ Help</Link></li>
        <li className="menu-item">
          <Link to="/profile" style={{ textDecoration: "none", color: "#333" }}>Profile</Link>
        </li>
        <li className="menu-item">
                 <button 
      onClick={handleLogout} 
      style={{
        padding: "8px 16px",
        background: "#ef4444",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      Logout
    </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
