const {
  getExpenses,
  createExpense,
  deleteExpenseById,
} = require('../services/expenseService');

// ===================FUNCTIONS========================
// Get all expenses
exports.getExpensesController = (_, res) => {
  try {
    res.send(getExpenses());
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a expense
exports.createExpenseController = (req, res) => {
  try {
    res.send(createExpense(req));
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a expense by its id
exports.deleteExpenseByIdController = (req, res) => {
  try {
    res.send(deleteExpenseById(req));
  } catch (error) {
    res.status(500).send(error);
  }
};
