const express = require('express');
const {
  getExpenses,
  createExpense,
} = require('../controllers/expensesController');
const expensesRouter = express.Router();

// "/group/id/expenses"
expensesRouter.route('/expenses').get(getExpenses).post(createExpense);

module.exports = expensesRouter;
