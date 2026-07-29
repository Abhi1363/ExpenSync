export const createExpenseDocument = (expense) => {
  return `
Merchant: ${expense.merchant}

Amount: ₹${expense.amount}

Category: ${expense.category}

Date: ${expense.date}

Description: ${expense.description || ""}
`;
};