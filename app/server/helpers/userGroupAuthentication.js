const { isAuthenticated } = require("@bcgov-cas/sso-express/dist/helpers");

const groupConstants = require("../../data/group-constants");
const { compactGroups } = require("../../lib/user-groups");

const removeLeadingSlash = (str) => (str[0] === "/" ? str.slice(1) : str);

const getUserGroups = (req) => {
  if (process.argv.includes("AS_CYPRESS") && req.cookies["mocks.auth"]) {
    return [req.cookies["mocks.auth"]];
  }
  if (!isAuthenticated(req)) return [groupConstants.GUEST];

  const identityProvider = req.claims.identity_provider;
  const groups = req.claims.groups || [];

  const processedGroups = groups.map((value) => removeLeadingSlash(value));
  const validGroups = compactGroups(processedGroups);

  if (validGroups.length === 0) {
    return identityProvider === "idir"
      ? [groupConstants.PENDING_ANALYST]
      : [groupConstants.USER];
  }

  return validGroups;
};

module.exports = {
  getUserGroups,
};
