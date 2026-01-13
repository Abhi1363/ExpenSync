import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import{showError} from"./Toast";

export const downloadAllTransactions = (expenses) => {
  const doc = new jsPDF();
  doc.text("All Transactions Report", 14, 10);

  const tableColumn = ["Description", "Category", "Amount", "Date"];
  const tableRows = expenses.map(exp => [
    exp.description,
    exp.category,
    `Rs. ${exp.amount}`,
    new Date(exp.date).toLocaleDateString()
  ]);


  autoTable(doc,{
    head: [tableColumn],
    body: tableRows,
    startY: 20
  });

  doc.save("all-transactions.pdf");
};

export const downloadTransactionsByDate = (expenses, startDate, endDate) => {
  if (!startDate || !endDate) {
showError("Please provide both start and end dates.");
    return;
  }

  const filteredExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    return expDate >= new Date(startDate) && expDate <= new Date(endDate);
  });

  if (filteredExpenses.length === 0) {
   showError("No transactions found in the selected date range.");
    return;
  }

  const doc = new jsPDF();
  doc.text(`Transactions from ${startDate} to ${endDate}`, 14, 10);

  const tableColumn = ["Description", "Category", "Amount", "Date"];
  const tableRows = filteredExpenses.map(exp => [
    exp.description,
    exp.category,
    `Rs. ${exp.amount}`,
    new Date(exp.date).toLocaleDateString()
  ]);

  autoTable(doc,{
    head: [tableColumn],
    body: tableRows,
    startY: 20
  });

  doc.save(`transactions-${startDate}-to-${endDate}.pdf`);
};
