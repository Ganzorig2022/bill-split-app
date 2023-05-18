const fs = require('fs');
const Debts = JSON.parse(
  fs.readFileSync(`${__dirname}/../database/debts.json`)
);
const Users = JSON.parse(
  fs.readFileSync(`${__dirname}/../database/users.json`)
);
const { processNewDebt } = require('../helpers/processNewDebt');

// ============GET requests============
// Get a list of all debts.
exports.getDebts = (_, res) => {
  res.status(200).json(Debts);
};

// Get a debt by lender and borrower.
exports.getDebtBetweenUsers = async (req, res) => {
  const { from, to } = req.body;

  // 1) find the debts exists (өр байгаа эсэхийг олох)
  const debts = Debts.find((debt) => debt.from === from && debt.to === to);

  // 2) If debt does not exist, then return error
  if (!debts)
    return res.status(204).json({
      message: `${from}, ${to} 2-ын хооронд өр байхгүй байна.`,
    });

  res.status(200).json({ status: 'found', data: debts });
};

// ============PUT requests============
// Add a debt between two users. (2 хүний хоорон дох өрийг нэмэх)
exports.addDebt = async (req, res) => {
  const { from, to, amount } = req.body;

  processNewDebt(from, to, amount);

  res.status(201).json({ status: 'success' });
};

// Settle a debt by ID (2 хүний хоорон дох өрийг хасах буюу тэглэх )
exports.settleDebt = async (req, res) => {
  const { from, to, amount } = req.body;

  // 1) find the debts exists (өр байгаа эсэхийг олох)
  const existingDebt = Debts.find(
    (debt) => debt.from === from && debt.to === to
  );

  // 2) Check if amount from request is lower than 0, then error
  if (amount <= 0) {
    res.status(400).send('Amount must be greater than ₮0.');
  }

  // 3) If amount is greater than 0, then proceed...
  if (amount > 0) {
    // 3.1) If the existing debt is greater than the amount to be settled, then reduce the debt
    // Өрийг хасагдуулах
    if (existingDebt && existingDebt.amount > amount) {
      // 3.1.1) Яг тухайн 2 хүний өрийг хасах
      const updatedDebts = Debts.map((debt) =>
        debt.from === from && debt.to === to
          ? { ...debt, amount: debt.amount - amount }
          : debt
      );

      // 3.1.2) Then push it to database
      fs.writeFile(
        `${__dirname}/../database/debts.json`,
        JSON.stringify(updatedDebts),
        (err) => {
          res.status(200).json({ status: 'success', data: updatedDebts });
        }
      );

      // 3.1.3) өрөө хасуулах хүн, авлагаа авах хүний нийт балансыг мөн update хийх
      const updatedUsers = Users.map((user) =>
        user.name === from
          ? { ...user, netDebt: user.netDebt + amount }
          : user.name === to
          ? { ...user, netDebt: user.netDebt - amount }
          : user
      );

      // 3.1.4) Then push it to database
      fs.writeFile(
        `${__dirname}/../database/users.json`,
        JSON.stringify(updatedUsers),
        (err) => {}
      );
    }

    // 3.2) If the existing debt is equal to the amount, then delete the debt
    // Өрийг бүр мөсөн устгах
    if (existingDebt && existingDebt.amount === amount) {
      // 3.2.1) Update debts array by removing
      const updatedDebts = Debts.filter(
        (debt) => debt.from !== from && debt.to !== to
      );

      // 3.2.2) Then push it to database
      fs.writeFile(
        `${__dirname}/../database/debts.json`,
        JSON.stringify(updatedDebts),
        (err) => {
          res.status(200).json({
            status: 'success',
            message: `${from} нь ${to}-ын өрийг 1 дор бүтэн төллөө.`,
          });
        }
      );

      // 3.2.3) өрөө хасуулах хүн, авлагаа авах хүний нийт балансыг мөн User бүр дээр нь update хийх
      const updatedUsers = Users.map((user) =>
        user.name === from
          ? { ...user, netDebt: user.netDebt + amount }
          : user.name === to
          ? { ...user, netDebt: user.netDebt - amount }
          : user
      );

      // 3.2.4) Then push it to database
      fs.writeFile(
        `${__dirname}/../database/users.json`,
        JSON.stringify(updatedUsers),
        (err) => {}
      );
    } else {
      res.status(204).json({
        message: `Угаасаа төлөх өр байхгүй байна.`,
      });
    }
  }
};
