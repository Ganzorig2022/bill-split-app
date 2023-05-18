const fs = require('fs');
const { processNewDebt } = require('../helpers/processNewDebt');
const Expenses = JSON.parse(
  fs.readFileSync(`${__dirname}/../database/expenses.json`)
);

const crypto = require('crypto');

// Get all expenses
exports.getExpenses = (_, res) => {
  res.status(200).json(Expenses);
};

// Create a expense
exports.createExpense = (req, res) => {
  const { amount, name, who_paid, debtors } = req.body;

  const id = crypto.randomBytes(10).toString('hex');

  // STEP-1. Зардлын мэдээллийг Expenses collection дээр хадгалах
  Expenses.push({
    id,
    name, // "odriin hool"
    who_paid, //"Ganzo"
    who_must_pay: debtors, //[{name: 'user1', amount:5000}, {name: 'user2', amount:5000}]
    amount, // 15000
    expense_date: Date.now(),
  });

  fs.writeFile(
    `${__dirname}/../database/expenses.json`,
    JSON.stringify(Expenses),
    (err) => {}
  );

  // STEP-2. Харгалзах өрийн мэдээллүүдийг Debts collection дээр хадгалах
  for (debtor of debtors) {
    const debtorName = debtor.name; // "Bilguun"
    const owedAmount = debtor.amount; // 5000

    processNewDebt(debtorName, who_paid, owedAmount);
  }

  res.status(201).json({ status: 'success', data: Expenses });
};

// //Update a group by its id
// exports.updateGroupById = (req, res) => {
//   const { id, name } = req.body;

//   const group = Groups.find((group) => group.id === id);

//   //middleware
//   if (!group)
//     return res.status(404).json({
//       message: 'Group not found with this id',
//     });

//   const updatedGroups = Groups.map((group) =>
//     group.id === id ? { ...group, name } : group
//   );

//   fs.writeFile(
//     `${__dirname}/../database/groups.json`,
//     JSON.stringify(updatedGroups),
//     (err) => {
//       res.status(200).json({ status: 'success', data: updatedGroups });
//     }
//   );
// };

// // Delete a group by its id
// exports.deleteExpenseById = (req, res) => {
//   const { id } = req.body;

//   //middleware
//   const group = Groups.find((group) => group.id === id);

//   if (!group)
//     return res.status(200).json({
//       message: 'Group not found with this id',
//     });

//   // then proceed to delete
//   const updatedGroups = Groups.filter((user) => user.id !== id);

//   fs.writeFile(
//     `${__dirname}/../database/groups.json`,
//     JSON.stringify(updatedGroups),
//     (err) => {
//       res.status(200).json({ status: 'success' });
//     }
//   );
// };
