const GROUP_META = require('../data/groups.json');

const getAllGroups = () => {
  return Object.keys(GROUP_META);
};

const compactGroups = groups => {
  const allDefinedGroups = getAllGroups();

  // Remove undefined groups
  const validGroups = [];
  groups.forEach(group =>
    allDefinedGroups.includes(group) ? validGroups.push(group) : null
  );

  return validGroups;
};

const getPriorityGroupData = validGroups => {
  // Find the highest priority group
  let name = validGroups[0];
  let priorityGroupData = GROUP_META[name];

  for (let x = 1; x < validGroups.length; x++) {
    name = validGroups[x];
    const curr = GROUP_META[name];

    if (curr.priority < priorityGroupData.priority) {
      priorityGroupData = curr;
    }
  }

  // Mutate priority group data to have the name along with priority and path
  priorityGroupData.name = name;
  return priorityGroupData;
};

const getPriorityGroup = groupNames => {
  const validGroups = compactGroups(groupNames);
  const priorityGroupData = getPriorityGroupData(validGroups);

  return priorityGroupData.name;
};

const getUserGroupLandingRoute = groupNames => {
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
