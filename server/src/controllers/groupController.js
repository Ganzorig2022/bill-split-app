const fs = require('fs');
const Groups = JSON.parse(
  fs.readFileSync(`${__dirname}/../database/groups.json`)
);
const crypto = require('crypto');

// Get all groups
exports.getGroups = (_, res) => {
  res.status(200).json(Groups);
};

// Get group by its id
exports.getGroupById = (req, res) => {
  const id = req.params.id;

  const group = Groups.find((group) => group.id === id);

  // 2) If debt does not exist, then return error
  if (!group)
    return res.status(204).json({
      message: `Угаасаа өр байхгүй байна.`,
    });

  res.status(200).json({ status: 'found', data: group });
};

// Create a new group
exports.createGroup = (req, res) => {
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

  fs.writeFile(
    `${__dirname}/../database/groups.json`,
    JSON.stringify(Groups),
    (err) => {
      res.status(201).json({ status: 'success', data: Groups });
    }
  );
};

//Update a group by its id
exports.updateGroupById = (req, res) => {
  const { id, name } = req.body;

  const group = Groups.find((group) => group.id === id);

  //middleware
  if (!group)
    return res.status(404).json({
      message: 'Group not found with this id',
    });

  const updatedGroups = Groups.map((group) =>
    group.id === id ? { ...group, name } : group
  );

  fs.writeFile(
    `${__dirname}/../database/groups.json`,
    JSON.stringify(updatedGroups),
    (err) => {
      res.status(200).json({ status: 'success', data: updatedGroups });
    }
  );
};

// Delete a group by its id
exports.deleteGroupById = (req, res) => {
  const { id } = req.body;

  //middleware
  const group = Groups.find((group) => group.id === id);

  if (!group)
    return res.status(200).json({
      message: 'Group not found with this id',
    });

  // then proceed to delete
  const updatedGroups = Groups.filter((user) => user.id !== id);

  fs.writeFile(
    `${__dirname}/../database/groups.json`,
    JSON.stringify(updatedGroups),
    (err) => {
      res.status(200).json({ status: 'success' });
    }
  );
};
