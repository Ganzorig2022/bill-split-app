const fs = require('fs');
const Debts = JSON.parse(
  fs.readFileSync(`${__dirname}/../database/debts.json`)
);
const Users = JSON.parse(
  fs.readFileSync(`${__dirname}/../database/users.json`)
);
const crypto = require('crypto');
const { writeFile } = require('./writeFile');

// Add a debt between two users. (2 хүний хоорон дох өрийг нэмэх)
exports.processNewDebt = async (from, to, amount) => {
  const id = crypto.randomBytes(16).toString('hex'); //generate random id

  // 1) find the debts exists (өр байгаа эсэхийг олох)
  const existingDebt = Debts.find(
    (debt) => debt.from === from && debt.to === to
  ); //

  // 2) If debt does not exist, then create it
  if (!existingDebt) {
    Debts.push({ id, from, to, amount });

    writeFile('debts', Debts);

    // 2.1.1) өрөө хасуулах хүн, авлагаа авах хүний нийт балансыг мөн update хийх
    const updatedUsers = Users.map((user) =>
      user.name === from
        ? { ...user, netDebt: user.netDebt + amount }
        : user.name === to
        ? { ...user, netDebt: user.netDebt - amount }
        : user
    );

    // 2.1.2) Then push it to database
    writeFile('users', updatedUsers);
  }

  // 3) if debt exists, then update it by amount (+ or -)
  if (existingDebt) {
    const updatedDebts = Debts.map((debt) =>
      debt.from === from && debt.to === to
        ? { ...debt, amount: debt.amount + amount }
        : debt
    );

    writeFile('debts', updatedDebts);

    // 2.1.1) өрөө хасуулах хүн, авлагаа авах хүний нийт балансыг мөн update хийх
    const updatedUsers = Users.map((user) =>
      user.name === from
        ? { ...user, netDebt: user.netDebt + amount }
        : user.name === to
        ? { ...user, netDebt: user.netDebt - amount }
        : user
    );

    // 2.1.2) Then push it to database

    writeFile('users', updatedUsers);
  }
};
