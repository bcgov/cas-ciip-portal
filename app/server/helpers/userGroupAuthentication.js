const groupConstants = require('../../data/group-constants');
const {compactGroups} = require('../../lib/user-groups');

const removeFirstLetter = (str) => str.slice(1);

const getUserGroups = (req) => {
  if (
    !req.kauth ||
    !req.kauth.grant ||
    !req.kauth.grant.id_token ||
    !req.kauth.grant.id_token.content ||
    !req.kauth.grant.id_token.content.groups
  )
    return [groupConstants.GUEST];

  const brokerSessionId = req.kauth.grant.id_token.content.broker_session_id;
  const {groups} = req.kauth.grant.id_token.content;

  const processedGroups = groups.map((value) => removeFirstLetter(value));
  const validGroups = compactGroups(processedGroups);

  if (validGroups.length === 0) {
    return brokerSessionId &&
      brokerSessionId.length === 41 &&
      brokerSessionId.startsWith('idir.')
      ? [groupConstants.PENDING_ANALYST]
      : [groupConstants.USER];
  }

  return validGroups;
};

module.exports = {
  getUserGroups
};
