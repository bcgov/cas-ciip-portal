const {
  createPostGraphileSchema,
  withPostGraphileContext,
} = require("postgraphile");
const { graphql } = require("graphql");
const authenticationPgSettings = require("./authenticationPgSettings");
const { pgPool, getDatabaseUrl } = require("../db/databaseConnectionService");
const postgraphileOptions = require("./postgraphileOptions");

const pgSettings = (req) => {
  const opts = {
    ...authenticationPgSettings(req),
  };
  return opts;
};

let postgraphileSchemaSingleton;

const postgraphileSchema = async () => {
  if (!postgraphileSchemaSingleton) {
    postgraphileSchemaSingleton = await createPostGraphileSchema(
      getDatabaseUrl(),
      process.env.DATABASE_SCHEMA || "ggircs_portal",
      postgraphileOptions()
    );
  }

  return postgraphileSchemaSingleton;
};

async function performQuery(query, variables, request) {
  const settings = pgSettings(request);

  return withPostGraphileContext(
    {
      pgPool,
      pgSettings: settings,
    },
    async (context) => {
      // `context` object, which should NOT be used outside of this
      // function.
      const result = graphql(
        await postgraphileSchema(),
        query,
        null,
        { ...context }, // You can add more to context if you like
        variables
      );
      return result;
    }
  );
}

module.exports = {
  performQuery,
};
