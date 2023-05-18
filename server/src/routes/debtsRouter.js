const express = require('express');
const {
  getDebts,
  getDebtBetweenUsers,
  addDebt,
  settleDebt,
  deleteDebtBetweenUsers,
} = require('../controllers/debtsController');
const debtsRouter = express.Router();

// "/group/id/debts"
debtsRouter.route('/debts').get(getDebts);

// "/group/id/debts/:from/:to"
debtsRouter
  .route('/debts/:from/:to')
  .get(getDebtBetweenUsers)
  .delete(deleteDebtBetweenUsers);

// "/group/id/debts/:from/add"
debtsRouter.route('/debts/add').post(addDebt);

// "/group/id/debts/:from/settle"
debtsRouter.route('/debts/settle').post(settleDebt);

module.exports = debtsRouter;
