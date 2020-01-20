const GROUP_META = require('../data/groups.json');

const getUserGroupLandingRoute = groups => {
  let priorityGroup = GROUP_META[groups[0]];

  for (let x = 1; x < groups.length; x++) {
    const curr = GROUP_META[groups[x]];

    if (curr.priority < priorityGroup.priority) {
      priorityGroup = curr;
    }
  }

  return priorityGroup.path;
};

const getAllGroupNames = () => {
  return Object.keys(GROUP_META);
};

module.exports = {getUserGroupLandingRoute, getAllGroupNames};
