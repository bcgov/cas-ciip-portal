const { performQuery } = require("../postgraphile/graphql");
const axios = require("axios");

// Middleware to verify that there aren't any existing users
// with the same email address as the one requesting access.

// This is to prevent multiple accounts with the same email address to request access,
// And to prevent the system from updating an existing user unexpectedly

const createUserMutation = `
query {
    validateCurrentUser
}
`;

const host = process.env.HOST || "http://localhost:3004";

const validateUserMiddleware = async (req, res, next) => {
  const response = await performQuery(createUserMutation, {}, req);
  if (!response.data.validateCurrentUser) {
    const config = {
      method: "post",
      url: `${host}/logout`,
    };

    axios(config)
      .then((response) => {
        console.log(
          "Duplicate bceid account error. Another user account with the same bceid details already exists in the system."
        );
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    return res
      .status(403)
      .send(
        `Duplicate bceid account detected. Access denied. Please contact ${process.env.ADMIN_EMAIL} for assistance.`
      );
  }
  return next();
};

module.exports = validateUserMiddleware;
