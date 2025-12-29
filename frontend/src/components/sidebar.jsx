import React, { useState, useEffect } from 'react';
import "./sidebar.css";
import { Link } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import { downloadAllTransactions, downloadTransactionsByDate } from "../utils/DownloadUtils";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg"

const Sidebar = () => {
  const [showTransaction, setShowTransaction] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/expenses", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExpenses(res.data);
      } catch (err) {
        console.error('Error fetching sidebar expenses:', err);
      }
    };
    fetchExpenses();
  }, []);

  const handleDownload = () => {
    if (expenses.length === 0) {
      // No expenses available; silently return
      return;
    }
    downloadAllTransactions(expenses);
  };

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    
    setOpen(true);
  };


  const ConfirmLogout = () => {
     setOpen(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    
  };

   const cancelLogout = () => {
    setOpen(false);
    
  };

  return (
    <div className="sidebar">
           {open && (
  <div className="overlay">
    <div className="popup">

      <p className="popup-message">
        Are you sure you want to log out?
      </p>

      <div className="popup-buttons">
        <button onClick={cancelLogout} className="btn cancel-btn">
          Cancel
        </button>

        <button onClick={ConfirmLogout} className="btn confirm-btn">
          Confirm
        </button>
      </div>

    </div>
  </div>
)}
      <div >
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }} className="logo"><img src={logo} alt="logo" style={{ height: 50, width: 100, borderRadius: 6, marginRight: 8 }} />
          ExpenseSync</div>

        <ul className="menu-section">
          <li className="menu-title">Main Menu</li>
          <li className="menu-item active">
            <Link to="/expenseBox" style={{ textDecoration: "none", color: "white" }}><i className="fa fa-home icon inline" /> Dashboard</Link>
          </li>
          <li className="menu-item">
            <Link to="/statistics" style={{ textDecoration: "none", color: "#333" }}><i className="fa fa-bar-chart icon inline" /> Statistics</Link>
          </li>
          <li className="menu-item" onClick={() => setShowTransaction(!showTransaction)}>
            <i className="fa fa-exchange icon inline" /> Transaction
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
                style={{ border: "none",  }}
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
            <Link to="/monthlyBudget" style={{ textDecoration: "none", color: "#333" }}><i className="fa fa-money icon inline" /> Monthly Budget Tracker</Link>
          </li>

        </ul>
      </div>


      <ul className="menu-section">
        <li className="menu-title">Management</li>
        <li className="menu-item">    <Link to="/help" style={{ textDecoration: "none", color: "#333" }}><i className="fa fa-question-circle icon inline" /> Help</Link></li>
        <li className="menu-item">
          <Link to="/profile" style={{ textDecoration: "none", color: "#333" }}><i className="fa fa-user icon inline" /> Profile</Link>
        </li>
        <li className="">
          <button
            onClick={handleLogoutClick}
            style={{
              width:"auto",
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
