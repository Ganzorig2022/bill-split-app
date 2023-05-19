const {
  getDebts,
  addDebt,
  getDebtBetweenUsers,
  settleDebt,
} = require('../services/debtService');

// ============GET requests============
// Get a list of all debts.
exports.getDebtsController = (_, res) => {
  try {
    res.send(getDebts());
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a debt by lender and borrower.
exports.getDebtBetweenUsersController = async (req, res) => {
  try {
    res.send(getDebtBetweenUsers(req));
  } catch (error) {
    res.status(500).send(error);
  }
};

// ============PUT requests============
// Add a debt between two users. (2 хүний хоорон дох өрийг нэмэх)
exports.addDebtController = async (req, res) => {
  try {
    res.send(addDebt(req));
  } catch (error) {
    res.status(500).send(error);
  }
};

// Settle a debt by ID (2 хүний хоорон дох өрийг хасах буюу тэглэх )
exports.settleDebtController = async (req, res) => {
  try {
    res.send(settleDebt(req));
  } catch (error) {
    res.status(500).send(error);
  }
};
