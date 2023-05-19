const fs = require('fs');
const Users = JSON.parse(
  fs.readFileSync(`${__dirname}/../database/users.json`)
);
const crypto = require('crypto');
const { writeFile } = require('../helpers/writeFile');

// Get All users
exports.getUsers = (req) => {
  const id = req.params.id;

  const user = Users.find((user) => user.id === id);

  return user;
};

// Get user by Id
exports.getUserByid = (req) => {
  const id = req.params.id;

  const user = Users.find((user) => user.id === id);

  return user;
};

// Create a user
exports.createUser = (req) => {
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
  console.log('Users', Users);

  writeFile('users', Users);

  return Users;
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

  writeFile('users', updatedUsers);

  return { status: 'success', data: updatedUsers };
};

// Delete a user by id
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  const user = Users.find((user) => user.id === id);

  if (!user)
    return {
      message: ' User not found with this id',
    };

  const updatedUsers = Users.filter((user) => user.id !== id);

  writeFile('users', updatedUsers);

  return { status: 'success' };
};
