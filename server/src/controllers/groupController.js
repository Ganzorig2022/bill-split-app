const {
  getGroups,
  getGroupById,
  createGroup,
  updateGroupById,
  deleteGroupById,
} = require('../services/groupService');

// Get All groups
exports.getGroupsController = async (_, res) => {
  try {
    res.send(getGroups());
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get group by Id
exports.getGroupController = (req, res) => {
  try {
    res.send(getGroupById(req));
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create group
exports.createGroupController = (req, res) => {
  try {
    res.send(createGroup(req));
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update group by id
exports.updateGroupController = (req, res) => {
  try {
    res.send(updateGroupById(req));
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete group by id
exports.deleteGroupController = (req, res) => {
  try {
    res.send(deleteGroupById(req));
  } catch (error) {
    res.status(500).send(error);
  }
};
