const {
  getUserByid,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../services/userService');

// Get All users
exports.getUsersController = async (_, res) => {
  try {
    res.send(getUsers());
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get user by Id
exports.getUserController = (req, res) => {
  try {
    res.send(getUserByid(req));
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create user
exports.createUserController = (req, res) => {
  try {
    res.send(createUser(req));
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update user by id
exports.updateUserController = (req, res) => {
  try {
    res.send(updateUser(req));
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete user by id
exports.deleteUserController = (req, res) => {
  try {
    res.send(deleteUser(req));
  } catch (error) {
    res.status(500).send(error);
  }
};
