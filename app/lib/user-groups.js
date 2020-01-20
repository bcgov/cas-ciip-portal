const GROUP_META = require('../data/groups.json');

const getAllGroupNames = () => {
  return Object.keys(GROUP_META);
};

const compactGroupNames = groups => {
  const allDefinedGroups = getAllGroupNames();

  // Remove undefined groups
  const validGroups = [];
  groups.forEach(group =>
    allDefinedGroups.includes(group) ? validGroups.push(group) : null
  );

  return validGroups;
};

const getUserGroupLandingRoute = groups => {
  const validGroups = compactGroupNames(groups);

  // Give Guest group if not belong to any group
  if (validGroups.length === 0) validGroups.push('Guest');

  // Now, find the highest priority group
  let priorityGroup = GROUP_META[validGroups[0]];

  for (let x = 1; x < validGroups.length; x++) {
    const curr = GROUP_META[validGroups[x]];

    if (curr.priority < priorityGroup.priority) {
      priorityGroup = curr;
    }
  }

  // Return the landing route of the highest priority group
  return priorityGroup.path;
};

module.exports = {
  getUserGroupLandingRoute,
  compactGroupNames,
  getAllGroupNames
};
