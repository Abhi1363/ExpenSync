import React, { useContext, useState, useEffect } from "react";
import "./sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../contexts/AuthContext";
import {
  downloadAllTransactions,
  downloadTransactionsByDate,
} from "../utils/DownloadUtils";
import logo from "../assets/newLogo.png";

const Sidebar = () => {
  const [showTransaction, setShowTransaction] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(res.data);
      } catch (err) {
        console.error("Error fetching sidebar expenses:", err);
      }
    };

    fetchExpenses();
  }, []);

  const handleDownload = () => {
    if (expenses.length === 0) {
      return;
    }
    downloadAllTransactions(expenses);
  };

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const confirmLogout = () => {
    setOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  const cancelLogout = () => {
    setOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      {open && (
        <div className="overlay">
          <div className="popup">
            <p className="popup-message">Are you sure you want to log out?</p>
            <div className="popup-buttons">
              <button onClick={cancelLogout} className="btn cancel-btn" type="button">
                Cancel
              </button>
              <button onClick={confirmLogout} className="btn confirm-btn" type="button">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="sidebar-top">
        <div className="logo-block">
          <img src={logo} alt="ExpenseSync logo" className="logo-image" />
          <div>
            <div className="logo-text">ExpenseSync</div>
            <div className="logo-subtext">Financial control center</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="menu-section">
          <div className="menu-title">Main Menu</div>
          <Link className={`menu-item ${isActive("/expenseBox") ? "active" : ""}`} to="/expenseBox">
            <i className="fa fa-home menu-icon" aria-hidden="true" />
            <span>Dashboard</span>
          </Link>
          <Link className={`menu-item ${isActive("/statistics") ? "active" : ""}`} to="/statistics">
            <i className="fa fa-bar-chart menu-icon" aria-hidden="true" />
            <span>Statistics</span>
          </Link>
          <button className="menu-item menu-button" onClick={() => setShowTransaction((prev) => !prev)} type="button">
            <i className="fa fa-exchange menu-icon" aria-hidden="true" />
            <span>Transaction</span>
          </button>

          {showTransaction && (
            <div className="menu-item menu-button">
              <button className="submenu-item" onClick={handleDownload} type="button">
                Download all transactions
              </button>
              <button
                className="submenu-item"
                onClick={() => setShowDateFilter((prev) => !prev)}
                type="button"
              >
                Download date-wise transactions
              </button>
            </div>
          )}

          {showDateFilter && (
            <div className="date-filter">
              <input className="date" type="date" onChange={(e) => setStartDate(e.target.value)} />
              <input className="date" type="date" onChange={(e) => setEndDate(e.target.value)} />
              <button
                className="date-download-btn"
                type="button"
                onClick={() => {
                  downloadTransactionsByDate(expenses, startDate, endDate);
                  setShowDateFilter(false);
                }}
              >
                Download
              </button>
            </div>
          )}

          <Link
            className={`menu-item ${isActive("/monthlyBudget") ? "active" : ""}`}
            to="/monthlyBudget"
          >
            <i className="fa fa-line-chart menu-icon" aria-hidden="true" />
            <span>Monthly Budget Tracker</span>
          </Link>
          <Link className={`menu-item ${isActive("/aiChat") ? "active" : ""}`} to="/aiChat">
            <i className="fa fa-comments menu-icon" aria-hidden="true" />
            <span>AI Chat</span>
          </Link>
        </div>

        <div className="menu-section bottom">
          <div className="menu-title">Management</div>
          <Link className={`menu-item ${isActive("/help") ? "active" : ""}`} to="/help">
            <i className="fa fa-question-circle menu-icon" aria-hidden="true" />
            <span>Help</span>
          </Link>
          <Link className={`menu-item ${isActive("/profile") ? "active" : ""}`} to="/profile">
            <i className="fa fa-user menu-icon" aria-hidden="true" />
            <span>Profile</span>
          </Link>
          <button className="logout-button" onClick={handleLogoutClick} type="button">
            <i className="fa fa-sign-out menu-icon" aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
