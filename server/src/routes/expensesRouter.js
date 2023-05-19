const express = require('express');
const {
  getExpensesController,
  createExpenseController,
  deleteExpenseByIdController,
} = require('../controllers/expensesController');
const expensesRouter = express.Router();

// "/group/id/expenses"
expensesRouter
  .route('/expenses')
  .get(getExpensesController)
  .post(createExpenseController);

// "/group/id/expenses/id"
expensesRouter.route('/expenses/:id').delete(deleteExpenseByIdController);

module.exports = expensesRouter;
