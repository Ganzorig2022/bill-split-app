const express = require('express');
const {
  getUsers,
  getUserByid,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const userRouter = express.Router();

// "/group/id/users/"
userRouter.route('/users').get(getUsers).post(createUser);

// "/group/id/users/id"
userRouter
  .route('/users/:id')
  .get(getUserByid)
  .put(updateUser)
  .delete(deleteUser);

module.exports = userRouter;
