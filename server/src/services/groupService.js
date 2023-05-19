const fs = require('fs');
const Groups = JSON.parse(
  fs.readFileSync(`${__dirname}/../database/groups.json`)
);
const crypto = require('crypto');
const { writeFile } = require('../helpers/writeFile');

// Get all groups
exports.getGroups = (_, res) => {
  return Groups;
};

// Get group by its id
exports.getGroupById = (req, res) => {
  const id = req.params.id;
  const group = Groups.find((group) => group.id === id);

  // 2) If debt does not exist, then return error
  if (!group)
    return {
      message: `Угаасаа өр байхгүй байна.`,
    };

  return { status: 'found', data: group };
};

// Create a new group
exports.createGroup = (req) => {
  const { admin, name } = req.body;
  const id = crypto.randomBytes(10).toString('hex');
  const group_link = `http://localhost:${process.env.PORT}/group/${id}`;

  Groups.push({
    id,
    name,
    group_link,
    members: [admin],
    admin,
    created: Date.now(),
  });

  writeFile('groups', Groups);

  return { status: 'success', data: Groups };
};

//Update a group by its id
exports.updateGroupById = (req, res) => {
  const { id, name } = req.body;

  const group = Groups.find((group) => group.id === id);

  //middleware
  if (!group)
    return {
      message: 'Group not found with this id',
    };

  const updatedGroups = Groups.map((group) =>
    group.id === id ? { ...group, name } : group
  );

  writeFile('groups', updatedGroups);

  return { status: 'success', data: updatedGroups };
};

// Delete a group by its id
exports.deleteGroupById = (req, res) => {
  const { id } = req.body;

  //middleware
  const group = Groups.find((group) => group.id === id);

  if (!group)
    return {
      message: 'Group not found with this id',
    };

  // then proceed to delete
  const updatedGroups = Groups.filter((user) => user.id !== id);

  writeFile('groups', updatedGroups);

  return { status: 'success' };
};
