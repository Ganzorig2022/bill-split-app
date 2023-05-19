const express = require('express');
const {
  getUsersController,
  getUserController,
  createUserController,
  updateUserController,
  deleteUserController,
} = require('../controllers/userController');
const userRouter = express.Router();

// "/group/id/users/"
userRouter.route('/users').get(getUsersController).post(createUserController);

// "/group/id/users/id"
userRouter
  .route('/users/:id')
  .get(getUserController)
  .put(updateUserController)
  .delete(deleteUserController);

module.exports = userRouter;
