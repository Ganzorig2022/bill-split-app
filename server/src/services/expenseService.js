const fs = require('fs');
const { processNewDebt } = require('../helpers/processNewDebt');
const Expenses = JSON.parse(
  fs.readFileSync(`${__dirname}/../database/expenses.json`)
);
const crypto = require('crypto');
const { writeFile } = require('../helpers/writeFile');

// ===================FUNCTIONS========================
// Get all expenses
exports.getExpenses = () => {
  return Expenses;
};

// Create a expense
exports.createExpense = (req) => {
  const { amount, name, who_paid, debtors, group_id } = req.body;
  const id = crypto.randomBytes(10).toString('hex'); //random id

  // STEP-1. Зардлын мэдээллийг Expenses collection дээр хадгалах
  Expenses.push({
    id,
    name, // "odriin hool"
    who_paid, //"Ganzo"
    who_must_pay: debtors, // [{name: 'user1', amount:5000}, {name: 'user2', amount:5000}]
    amount, // 15000
    expense_date: Date.now(),
    group_id,
  });

  writeFile('expenses', Expenses);

  // STEP-2. Харгалзах өрийн мэдээллүүдийг Debts collection дээр хадгалах
  for (debtor of debtors) {
    const debtorName = debtor.name; // "Bilguun"
    const owedAmount = debtor.amount; // 5000

    processNewDebt(debtorName, who_paid, owedAmount);
  }

  return { status: 'success', data: Expenses };
};

// Delete a expense by its id
exports.deleteExpenseById = (req) => {
  const { id } = req.body;

  //middleware
  const expense = Expenses.find((expense) => expense.id === id);

  if (!expense)
    return {
      message: 'Expense not found with this id',
    };

  // then proceed to delete
  const updatedExpenses = Expenses.filter((expense) => expense.id !== id);

  writeFile('expenses', updatedExpenses);

  return { status: 'success' };
};
