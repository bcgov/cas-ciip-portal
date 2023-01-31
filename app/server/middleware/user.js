const { performQuery } = require("../postgraphile/graphql");

// Middleware to verify that there aren't any existing users
// with the same email address as the one requesting access.

// This is to prevent multiple accounts with the same email address to request access,
// And to prevent the system from updating an existing user unexpectedly

const createUserMutation = `
query {
    verifyUserValid(input: {}) {
    __typename
  }
}
`;

function validateUserMiddleware() {
  const f = async (req) => {
    const response = await performQuery(createUserMutation, {}, req);

    if (response.errors) {
      throw new Error(
        `Failed to update or create user from session:\n${response.errors.join(
          "\n"
        )}`
      );
    }
  };

  return f;
}

module.exports = validateUserMiddleware;
