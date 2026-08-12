export const createExpenseDocument = (expense) => {
  return `

  Category: ${expense.category}

  Amount: ₹${expense.amount}
  
  Date: ${expense.date}
 
  Description: ${expense.description || ""}
`;
};