import React, { useContext, useEffect, useMemo, useState } from "react";
import "./expenseBox.css";
import axiosInstance from "../utils/axiosInstance";
import { getCurrentMonthTransactions } from "../utils/monthlyUtils";
import Sidebar from "./sidebar";
import { showSuccess, showError } from "../utils/Toast";
import { AuthContext } from "../contexts/AuthContext";

const categoryIcons = {
  Shopping: "fa fa-shopping-bag",
  Food: "fa fa-cutlery",
  Travel: "fa fa-plane",
  Utilities: "fa fa-bolt",
  Others: "fa fa-ellipsis-h",
};

const categoryPalette = ["#6bc46d", "#ffbc44", "#5b8def", "#ef5f57", "#9b7cff", "#18b7a7"];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));

const ExpenseBox = () => {
  const { user } = useContext(AuthContext);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 10;

  const [initialTotalAmount] = useState(
    localStorage.getItem("initialTotalAmount")
      ? parseFloat(localStorage.getItem("initialTotalAmount"))
      : 0
  );

  const [remainingAmount, setRemainingAmount] = useState(initialTotalAmount);

  useEffect(() => {
    const fetchExpenses = async (search = "") => {
      try {
        const res = await axiosInstance.get("/expenses", {
          params: { search },
        });

        setExpenses(res.data);

        const totalSpent = res.data.reduce((acc, expense) => acc + expense.amount, 0);
        setTotalExpense(totalSpent);

        const remaining = initialTotalAmount - totalSpent;
        setRemainingAmount(remaining);
        localStorage.setItem("remainingAmount", remaining);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses(searchTerm);
  }, [searchTerm, initialTotalAmount]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleAmount = (e) => setAmount(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !amount) {
      showError("Please provide both description and amount.");
      return;
    }

    try {
      const res = await axiosInstance.post("/expenses", {
        description,
        amount: parseFloat(amount),
        category,
      });

      setExpenses((prev) => [...prev, res.data]);

      const updatedExpense = totalExpense + res.data.amount;
      setTotalExpense(updatedExpense);

      const updatedRemaining = initialTotalAmount - updatedExpense;
      setRemainingAmount(updatedRemaining);
      localStorage.setItem("remainingAmount", updatedRemaining);

      setDescription("");
      setAmount("");
      setCategory("");

      showSuccess("Expense added successfully!");
    } catch (err) {
      console.error("Error adding expense", err);
      showError("Failed to add expense.");
    }
  };

  const handleDeleteClick = (id, amountToRemove) => {
    setPendingDelete({ id, amount: amountToRemove });
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;

    const { id: expenseId, amount: amountToRemove } = pendingDelete;
    setOpen(false);
    setPendingDelete(null);

    try {
      await axiosInstance.delete(`/expenses/${expenseId}`);

      const updatedExpenses = expenses.filter((expense) => expense._id !== expenseId);
      setExpenses(updatedExpenses);

      const updatedTotalExpense = totalExpense - amountToRemove;
      setTotalExpense(updatedTotalExpense);

      const updatedRemaining = initialTotalAmount - updatedTotalExpense;
      setRemainingAmount(updatedRemaining);
      localStorage.setItem("remainingAmount", updatedRemaining);

      showSuccess("Expense deleted successfully!");
    } catch (error) {
      console.error("Error deleting expense:", error);
      showError("Failed to delete expense.");
    }
  };

  const cancelDelete = () => {
    setOpen(false);
    setPendingDelete(null);
  };

  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  const monthlyTransactions = useMemo(() => getCurrentMonthTransactions(expenses), [expenses]);
  const monthlyTransactionCount = monthlyTransactions.length;

  const totalPages = Math.max(1, Math.ceil(sortedExpenses.length / expensesPerPage));
  const pageStart = (currentPage - 1) * expensesPerPage;
  const pageExpenses = sortedExpenses.slice(pageStart, pageStart + expensesPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  const chartGradient = sortedCategories
    .reduce(
      (gradient, [_categoryName, total], index) => {
        const percentage = totalExpense ? (total / totalExpense) * 100 : 0;
        const start = gradient.lastEnd ?? 0;
        const end = start + percentage;
        const color = categoryPalette[index % categoryPalette.length];
        gradient.stops.push(`${color} ${start}% ${end}%`);
        gradient.lastEnd = end;
        return gradient;
      },
      { stops: [], lastEnd: 0 }
    )
    .stops.join(", ");

  const currentMonthLabel = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const greetingName =
    user?.name || user?.username || user?.firstName || user?.email?.split("@")?.[0] || "there";
  const totalAmountValue = remainingAmount;

  const summaryCards = [
    {
      title: "Total Amount",
      value: formatCurrency(totalAmountValue),
      subtitle: "Overall Balance",
      icon: "fa fa-credit-card",
      tint: "green",
    },
    {
      title: "Total Expense",
      value: formatCurrency(totalExpense),
      subtitle: "This Month",
      icon: "fa fa-shopping-cart",
      tint: "red",
    },
    {
      title: "This Month's Transactions",
      value: String(monthlyTransactionCount),
      subtitle: "Total Entries",
      icon: "fa fa-list",
      tint: "blue",
    },
  ];

  return (
    <div className="dashboard-page">
      <Sidebar />

      <main className="dashboard-main">
        {open && (
          <div className="overlay">
            <div className="popup">
              <p className="popup-message">Are you sure you want to delete?</p>
              <div className="popup-buttons">
                <button onClick={cancelDelete} className="btn cancel-btn" type="button">
                  Cancel
                </button>
                <button onClick={confirmDelete} className="btn confirm-btn" type="button">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        <header className="dashboard-topbar">
          <div className="hero-copy">
            <p className="eyebrow">ExpenseSync</p>
            <h1>Welcome back, {greetingName}</h1>
            <p>Here's what is happening with your finances today.</p>
          </div>

          <div className="topbar-actions">
            <button className="month-pill" type="button">
              <i className="fa fa-calendar-o" aria-hidden="true" />
              <span>{currentMonthLabel}</span>
              <i className="fa fa-chevron-down caret" aria-hidden="true" />
            </button>
            <button className="ghost-icon" type="button" aria-label="Notifications">
              <i className="fa fa-bell-o" aria-hidden="true" />
            </button>
            <div className="avatar-chip" aria-label="Profile avatar">
              {String(greetingName).charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <section className="kpi-grid">
          {summaryCards.map((card) => (
            <article className="summary-card" key={card.title}>
              <div className={`summary-icon ${card.tint}`}>
                <i className={card.icon} aria-hidden="true" />
              </div>
              <div className="summary-copy">
                <p>{card.title}</p>
                <h2>{card.value}</h2>
                <span>{card.subtitle}</span>
              </div>
              <div className={`trend ${card.tint}`}>
                <i className="fa fa-line-chart" aria-hidden="true" />
              </div>
            </article>
          ))}
        </section>

        <section className="dashboard-grid">
          <article className="panel expense-panel">
            <div className="panel-head">
              <h2>Add Your Expense</h2>
            </div>

            <form className="expense-form" onSubmit={handleSubmit}>
              <label className="field-label">
                Add Description
                <div className="field-shell">
                  <i className="fa fa-file-text-o field-icon" aria-hidden="true" />
                  <input
                    className="field-input"
                    type="text"
                    placeholder="Enter expense details..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </label>

              <div className="form-row">
                <label className="field-label">
                  Select Category
                  <div className="field-shell select-shell">
                    <select
                      className="field-input field-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select category</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Food">Food</option>
                      <option value="Travel">Travel</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Others">Others</option>
                    </select>
                    <i className="fa fa-chevron-down field-chevron" aria-hidden="true" />
                  </div>
                </label>

                <label className="field-label">
                  Enter Amount
                  <div className="field-shell">
                    <i className="fa fa-inr field-icon" aria-hidden="true" />
                    <input
                      className="field-input"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={handleAmount}
                      min="0"
                    />
                  </div>
                </label>
              </div>

              <button type="submit" className="primary-button">
                Add Expense
              </button>
            </form>
          </article>

          <article className="panel chart-panel">
            <div className="panel-head">
              <h2>Category-wise Spending</h2>
            </div>

            <div className="chart-layout">
              <div
                className="donut-chart"
                style={{
                  background: totalExpense ? `conic-gradient(${chartGradient})` : "#f0f3f7",
                }}
              >
                <div className="donut-hole" />
                <div className="donut-center">
                  <div className="donut-total">{formatCurrency(totalExpense)}</div>
                  <div className="donut-label">Total</div>
                </div>
              </div>

              <div className="legend-list">
                {sortedCategories.length === 0 ? (
                  <div className="legend-empty">No category data yet.</div>
                ) : (
                  sortedCategories.map(([categoryName, total], index) => {
                    const percentage = totalExpense
                      ? ((total / totalExpense) * 100).toFixed(2)
                      : "0.00";

                    return (
                      <div key={categoryName} className="legend-item">
                        <div className="legend-meta">
                          <span
                            className="legend-dot"
                            style={{ backgroundColor: categoryPalette[index % categoryPalette.length] }}
                          />
                          <span className="legend-name">{categoryName}</span>
                        </div>
                        <div className="legend-value">
                          {formatCurrency(total)} ({percentage}%)
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </article>
        </section>

        <section className="panel transactions-panel">
          <div className="transactions-head">
            <h2>Recent Transactions</h2>
            <label className="search-shell">
              <i className="fa fa-search" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
          </div>

          <div className="table-wrap">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Delete</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {pageExpenses.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-row">
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  pageExpenses.map((expense) => {
                    const rowIcon = categoryIcons[expense.category] || "fa fa-tag";
                    return (
                      <tr key={expense._id}>
                        <td>
                          <div className="transaction-cell">
                            <span className="transaction-icon">
                              <i className={rowIcon} aria-hidden="true" />
                            </span>
                            <span>{expense.description}</span>
                          </div>
                        </td>
                        <td>{expense.category}</td>
                        <td className="amount">{formatCurrency(expense.amount)}</td>
                        <td>
                          <button
                            className="icon-button danger"
                            onClick={() => handleDeleteClick(expense._id, expense.amount)}
                            type="button"
                            aria-label="Delete transaction"
                          >
                            <i className="fa fa-trash-o" aria-hidden="true" />
                          </button>
                        </td>
                        <td>{new Date(expense.date).toLocaleDateString()}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                type="button"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                <button
                  key={page}
                  className={`page-button ${page === currentPage ? "active" : ""}`}
                  onClick={() => setCurrentPage(page)}
                  type="button"
                >
                  {page}
                </button>
              ))}

              <button
                className="page-button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                type="button"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ExpenseBox;
