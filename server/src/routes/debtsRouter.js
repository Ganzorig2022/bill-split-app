const express = require('express');
const {
  getDebtsController,
  getDebtBetweenUsersController,
  addDebtController,
  settleDebtController,
} = require('../controllers/debtsController');
const debtsRouter = express.Router();

// "/group/id/debts"
debtsRouter.route('/debts').get(getDebtsController);

// "/group/id/debts/:from/:to"
debtsRouter.route('/debts/:from/:to').get(getDebtBetweenUsersController);

// "/group/id/debts/:from/add"
debtsRouter.route('/debts/add').post(addDebtController);

// "/group/id/debts/:from/settle"
debtsRouter.route('/debts/settle').post(settleDebtController);

module.exports = debtsRouter;
