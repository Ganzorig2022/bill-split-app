const express = require('express');
const {
  getGroups,
  getGroupById,
  createGroup,
  updateGroupById,
  deleteGroupById,
} = require('../controllers/groupController');

const groupRouter = express.Router();

// "/group"
groupRouter.route('/').get(getGroups).post(createGroup);

// "/group/id"
groupRouter
  .route('/:id')
  .get(getGroupById) // Get a group by their id.
  .put(updateGroupById) // Update a group.
  .delete(deleteGroupById); //Delete a group by their id.

module.exports = groupRouter;
