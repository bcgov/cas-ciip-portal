const GROUP_META = require('../data/groups.json');

const getAllGroups = () => {
  return Object.keys(GROUP_META);
};

const compactGroups = (groups) => {
  const allDefinedGroups = getAllGroups();

  return groups.filter((group) => allDefinedGroups.includes(group));
};

const getPriorityGroupData = (validGroups) => {
  // Find the highest priority group
  let priorityGroup = {
    name: 'Guest',
    ...GROUP_META.Guest
  };

  for (let x = 0, len = validGroups.length; x < len; x++) {
    const name = validGroups[x];
    const curr = GROUP_META[name];

    if (curr.priority < priorityGroup.priority) {
      priorityGroup = {...curr, name};
    }
  }

  return priorityGroup;
};

const getPriorityGroup = (groupNames) => {
  const validGroups = compactGroups(groupNames);
  const priorityGroupData = getPriorityGroupData(validGroups);

  return priorityGroupData.name;
};

const getUserGroupLandingRoute = (groupNames) => {
  const validGroups = compactGroups(groupNames);
  const priorityGroupData = getPriorityGroupData(validGroups);

  return priorityGroupData.path;
};

module.exports = {
  getUserGroupLandingRoute,
  getPriorityGroup,
  compactGroups,
  getAllGroups
};
