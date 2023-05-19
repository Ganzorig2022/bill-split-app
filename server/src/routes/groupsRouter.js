const express = require('express');
const {
  getGroupsController,
  getGroupController,
  createGroupController,
  updateGroupController,
  deleteGroupController,
} = require('../controllers/groupController');

const groupRouter = express.Router();

// "/group"
groupRouter.route('/').get(getGroupsController).post(createGroupController);

// "/group/id"
groupRouter
  .route('/:id')
  .get(getGroupController) // Get a group by their id.
  .put(updateGroupController) // Update a group.
  .delete(deleteGroupController); //Delete a group by their id.

module.exports = groupRouter;
