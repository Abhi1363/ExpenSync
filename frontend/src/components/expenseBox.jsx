import React, { useEffect, useMemo, useState } from "react";
import "./expenseBox.css";
import axiosInstance from '../utils/axiosInstance';
import { getCurrentMonthTransactions } from "../utils/monthlyUtils";
import Footer from "./footer";
import Sidebar from "./sidebar";
import { showSuccess, showError } from "../utils/Toast";

const ExpenseBox = () => {
  const [description, setDescription] = useState("");           //3
  const [amount, setAmount] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 10;


  //1

  const [initialTotalAmount, setInitialTotalAmount] = useState(
    localStorage.getItem("initialTotalAmount")
      ? parseFloat(localStorage.getItem("initialTotalAmount"))
      : "0"
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

  const handleDescription = (e) => setDescription(e.target.value);
  const handleAmount = (e) => setAmount(e.target.value);
  const handleTotalAmountChange = (e) => {
    const initialAmount = parseFloat(e.target.value) || 0;
    setInitialTotalAmount(initialAmount);
    const newRemaining = initialAmount - totalExpense;
    setRemainingAmount(newRemaining);

    localStorage.setItem("initialTotalAmount", String(initialAmount));
    localStorage.setItem("remainingAmount", String(newRemaining));
  };

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
        category
      });

      // ⬇️ Update UI once, using the same res.data
      setExpenses((prev) => [...prev, res.data]);

      const updatedExpense = totalExpense + res.data.amount;
      setTotalExpense(updatedExpense);

      const updatedRemaining = initialTotalAmount - updatedExpense;
      setRemainingAmount(updatedRemaining);
      localStorage.setItem("remainingAmount", updatedRemaining);

      setDescription("");
      setAmount("");
      setCategory("")

      showSuccess("Expense added successfully!");
    } catch (err) {
      console.error("Error adding expense", err);

      showError("Failed to add expense.");
    }
  };

  const handleDeleteClick = (id, amount) => {
    setPendingDelete({ id, amount });
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const { id: _id, amount: amountToRemove } = pendingDelete;
    setOpen(false);
    setPendingDelete(null);

    try {
    await axiosInstance.delete(`/expenses/${_id}`);

      const updatedExpenses = expenses.filter((expense) => expense._id !== _id);
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
  // const handleDelete = async (_id, amountToRemove) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
  //   if (!confirmDelete) return;
  //   try {
  //     await axios.delete(`http://localhost:3000/api/expenses/${_id}`);

  //     const updatedExpenses = expenses.filter((expense) => expense._id !== _id);
  //     setExpenses(updatedExpenses);

  //     const updatedTotalExpense = totalExpense - amountToRemove;
  //     setTotalExpense(updatedTotalExpense);

  //     const updatedRemaining = initialTotalAmount - updatedTotalExpense;
  //     setRemainingAmount(updatedRemaining);

  //     localStorage.setItem("remainingAmount", updatedRemaining);
  //     showSuccess("Expense deleted successfully!");

  //   } catch (error) {
  //     console.error("Error deleting expense:", error);
  //     showError("Failed to delete expense.");
  //   }
  // };

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const monthlyTransactions = useMemo(() => {
    return getCurrentMonthTransactions(expenses);
  }, [expenses]);

  const monthlyTransactionCount = monthlyTransactions.length;

  const totalPages = Math.max(1, Math.ceil(sortedExpenses.length / expensesPerPage));
  const pageStart = (currentPage - 1) * expensesPerPage;
  const pageExpenses = sortedExpenses.slice(pageStart, pageStart + expensesPerPage);

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const categoryTotals = expenses.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = 0;
    }
    acc[curr.category] += curr.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1]); // [ ['Food', 100], ['Travel', 60], ... ]

  const categoryColors = ["#4CAF50", "#FFB74D", "#42A5F5", "#9C27B0", "#00BFA5", "#FF7043"];

  const chartGradient = sortedCategories.reduce((gradient, [category, amount], index) => {
    const percentage = totalExpense ? (amount / totalExpense) * 100 : 0;
    const start = gradient.lastEnd ?? 0;
    const end = start + percentage;
    const color = categoryColors[index % categoryColors.length];
    gradient.stops.push(`${color} ${start}% ${end}%`);
    gradient.lastEnd = end;
    return gradient;
  }, { stops: [], lastEnd: 0 }).stops.join(", ");

  return (
    <>
      <div className="section">

        <Sidebar></Sidebar>
        {/* Trigger Button */}




        <section>
          {open && (
            <div className="overlay">
              <div className="popup">

                <p className="popup-message">
                  Are you sure you want to delete?
                </p>

                <div className="popup-buttons">
                  <button onClick={cancelDelete} className="btn cancel-btn">
                    Cancel
                  </button>

                  <button onClick={confirmDelete} className="btn confirm-btn">
                    Confirm
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Amount Display */}
          <div className="AmountDisplay">
            <div className="total">
              <div className="totalAmount">
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <i style={{width:"50px", height:"50px"}} className="fa fa-credit-card icon" aria-hidden="true"></i>
                  <b>Total Amount</b>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", marginLeft: "25%" }}>
                  <b>₹</b>
                  <input
                    type="number"
                    value={remainingAmount}
                    onChange={handleTotalAmountChange}
                    placeholder=" Add Amount"
                  />
                </div>
              </div>

              <div className="totalExpense">
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <i style={{width:"50px", height:"50px"}} className="fa fa-shopping-cart icon" aria-hidden="true"></i>
                  <b>Total Expense</b>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px"}}>
                  <b>₹</b>
                  {/* <input type="number" value={totalExpense} readOnly /> */}
                  <span>{totalExpense}</span>
                </div>
              </div>

              <div className="totalTransaction">
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <i style={{width:"50px", height:"50px"}} className="fa fa-list icon" aria-hidden="true"></i>
                  <b>Month's Transactions</b>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px"}}>
                  <span>{monthlyTransactionCount}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="Horizontal">
            {/* Add Expense Form */}
            <div className="expense">
              <form className="forms" onSubmit={handleSubmit}>
                <p>Add Your Expenses..!</p>
                <br />
                <label><b>Add Description:</b></label>
                <input
                  className="description"
                  type="text"
                  placeholder="Expense Details"
                  value={description}
                  onChange={handleDescription}
                />
                <br />
                <label><b>Select Category:</b></label>
                <select className="selects" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">--Choose Category--</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Others">Others</option>
                </select><br></br>

                <label><b>Enter Amount:</b></label>
                <input
                  className="Amount"
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={handleAmount}
                  min="0"        
                />

                <br /><br />

                <button type="submit"><b>Add Expense</b></button>
              </form>
            </div>

            <div className="category-progress">
              <h3>Category-wise Spending</h3>
              <div className="category-summary">
                <div
                  className="donut-chart"
                  style={{
                    background: totalExpense
                      ? `conic-gradient(${chartGradient})`
                      : "#f0f0f0",
                  }}
                >
                  <div className="donut-hole" />
                  <div className="donut-center">
                    <div className="donut-total">₹{totalExpense.toFixed(0)}</div>
                    <div className="donut-label">Total</div>
                  </div>
                </div>
                <div className="legend">
                  {sortedCategories.map(([category, amount], idx) => {
                    const percentage = totalExpense
                      ? ((amount / totalExpense) * 100).toFixed(2)
                      : "0.00";
                    return (
                      <div key={category} className="category-item">
                        <div className="category-meta">
                          <span
                            className="legend-dot"
                            style={{ backgroundColor: categoryColors[idx % categoryColors.length] }}
                          />
                          <span className="category-name">{category}</span>
                        </div>
                        <div className="category-value">
                          ₹{amount} · {percentage}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="line"></div>
          <br />


          <div className="list">
            <div className="transaction-box">
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />

              <div className="expense-list">
                {searchTerm &&
                  expenses
                    .filter((expense) => {
                      const name = expense?.description || "";
                      const expCategory = expense?.category || "";
                      const term = searchTerm.toLowerCase();
                      return name.toLowerCase().includes(term) || expCategory.toLowerCase().includes(term);
                    })
                    .map((expense) => (
                      <div key={expense._id} className="expense-item highlight">
                        {expense.description} ({expense.category}) – ₹{expense.amount}
                      </div>
                    ))}
              </div>


              <h3>Recent Transactions</h3>
              <table>
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
                  {pageExpenses.map((expense) => (
                    <tr key={expense._id}>
                      <td>{expense.description}</td>


                      <td> {expense.category}</td>

                      <td className="amount">₹{expense.amount.toFixed(2)}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteClick(expense._id, expense.amount)}
                        >
                          Delete
                        </button>
                      </td>
                      <td>{new Date(expense.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="page-button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                    <button
                      key={page}
                      className={`page-button ${page === currentPage ? "active" : ""}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    className="page-button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="quote">
            "Do not save what is left after spending,<br />
            but spend what is left after saving." – Warren Buffett
          </p>
        </section>
      </div>



      <Footer></Footer>

    </>
  );
};

export default ExpenseBox;
