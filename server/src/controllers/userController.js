const fs = require('fs');
const crypto = require('crypto');
const Users = JSON.parse(
  fs.readFileSync(`${__dirname}/../database/users.json`)
);

// Get All users
exports.getUsers = (_, res) => {
  res.status(200).json(Users);
};

// Get user by Id
exports.getUserByid = (req, res) => {
  const id = req.params.id;

  const user = Users.find((user) => user.id === id);

  return res.status(200).json(user);
};

// Create a user
exports.createUser = (req, res) => {
  const { name, email, password, phone } = req.body;
  const id = crypto.randomBytes(16).toString('hex');

  Users.push({
    id,
    name,
    email,
    password,
    phone,
    netDebt: 0,
  });

  fs.writeFile(
    `${__dirname}/../database/users.json`,
    JSON.stringify(Users),
    (err) => {
      res.status(201).json({ status: 'success', data: Users });
    }
  );
};

// Update a user by id
exports.updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;
  const user = Users.find((user) => user.id === id);

  if (!user)
    return res.status(404).json({
      message: ' User not found with this id',
    });

  const updatedUsers = Users.map((user) =>
    user.id === id ? { ...user, name, email, phone } : user
  );

  fs.writeFile(
    `${__dirname}/../database/users.json`,
    JSON.stringify(updatedUsers),
    (err) => {
      res.status(201).json({ status: 'success', data: updatedUsers });
    }
  );
};

// Delete a user by id
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  const user = Users.find((user) => user.id === id);

  if (!user)
    return res.status(200).json({
      message: ' User not found with this id',
    });

  const updatedUsers = Users.filter((user) => user.id !== id);

  fs.writeFile(
    `${__dirname}/../database/users.json`,
    JSON.stringify(updatedUsers),
    (err) => {
      res.status(201).json({ status: 'success' });
    }
  );
};
