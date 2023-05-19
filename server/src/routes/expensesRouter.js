const express = require('express');
const {
  getExpenses,
  createExpense,
  deleteExpenseById,
} = require('../controllers/expensesController');
const expensesRouter = express.Router();

// "/group/id/expenses"
expensesRouter.route('/expenses').get(getExpenses).post(createExpense);

// "/group/id/expenses/id"
expensesRouter.route('/expenses/:id').delete(deleteExpenseById);

module.exports = expensesRouter;
