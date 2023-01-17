const { default: ssoExpress } = require("@bcgov-cas/sso-express");
const dotenv = require("dotenv");
const { getUserGroupLandingRoute } = require("../../lib/user-groups");
const { getUserGroups } = require("../helpers/userGroupAuthentication");

dotenv.config();

const NO_AUTH = process.argv.includes("NO_AUTH");
const AS_REPORTER = process.argv.includes("AS_REPORTER");
const AS_ANALYST = process.argv.includes("AS_ANALYST");
const AS_ADMIN = process.argv.includes("AS_ADMIN");
const AS_PENDING = process.argv.includes("AS_PENDING");
const AS_CYPRESS = process.argv.includes("AS_CYPRESS");

const mockLogin =
  NO_AUTH || AS_ADMIN || AS_ANALYST || AS_PENDING || AS_REPORTER || AS_CYPRESS;

const host = process.env.HOST || "http://localhost:3004";
const namespace = process.env.NAMESPACE;
const kcClientSecret = process.env.KC_CLIENT_SECRET;

let ssoServerHost = "";
if (!namespace || namespace.endsWith("-dev"))
  ssoServerHost = "dev.loginproxy.gov.bc.ca";
else if (namespace.endsWith("-test"))
  ssoServerHost = "test.loginproxy.gov.bc.ca";
else ssoServerHost = "loginproxy.gov.bc.ca";

async function middleware() {
  return ssoExpress({
    applicationDomain: ".gov.bc.ca",
    getLandingRoute: (req) => {
      if (req.query.redirectTo) return req.query.redirectTo;

      const groups = getUserGroups(req);
      console.log("GROUPS ", groups);

      return getUserGroupLandingRoute(groups);
    },
    getRedirectUri: (defaultRedirectUri, req) => {
      const redirectUri = new URL(defaultRedirectUri);
      if (req.query.redirectTo)
        redirectUri.searchParams.append(
          "redirectTo",
          req.query.redirectTo.toString()
        );

      return redirectUri;
    },
    bypassAuthentication: {
      login: mockLogin,
      sessionIdleRemainingTime: mockLogin,
    },
    oidcConfig: {
      baseUrl: host,
      clientId: "ciip-4440",
      oidcIssuer: `https://${ssoServerHost}/auth/realms/standard`,
      clientSecret: kcClientSecret,
    },
    authorizationUrlParams: (req) => {
      if (req.query.kc_idp_hint === "idir") return { kc_idp_hint: "idir" };
      if (req.query.kc_idp_hint === "bceidboth")
        console.warn("BCeID login is not supported yet.");
      return {};
    },
  });
}

module.exports = middleware;
