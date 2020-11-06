const {getAllGroups, getPriorityGroup} = require('../../lib/user-groups');
const groupData = require('../../data/groups');

const NO_AUTH = process.argv.includes('NO_AUTH');
const AS_REPORTER = process.argv.includes('AS_REPORTER');
const AS_CERTIFIER = process.argv.includes('AS_CERTIFIER');
const AS_ANALYST = process.argv.includes('AS_ANALYST');
const AS_ADMIN = process.argv.includes('AS_ADMIN');
const AS_PENDING = process.argv.includes('AS_PENDING');

const authenticationPgSettings = (req) => {
  // if(process.env.ENABLE_DB_MOCKS === 'true'){
  //   // important is that the mocks schema gets resolved before pg_catalog
  //   mockTimestampOptions.search_path = 'mocks,pg_catalog,public';

  //   if(req.cookies['mocks.mocked_timestamp'] !== undefined)
  //     mockTimestampOptions['mocks.mocked_timestamp'] = req.cookies['mocks.mocked_timestamp'];
  // }

  if (NO_AUTH) {
    const groups = getAllGroups();
    const priorityGroup = getPriorityGroup(groups);
    return {
      'jwt.claims.sub': '00000000-0000-0000-0000-000000000000',
      'jwt.claims.user_groups': groups.join(','),
      'jwt.claims.priority_group': priorityGroup,
      role: NO_AUTH_POSTGRES_ROLE
    };
  }

  if (AS_CERTIFIER) {
    return {
      'jwt.claims.sub': '15a21af2-ce88-42e6-ac90-0a5e24260ec6',
      'jwt.claims.user_groups': 'User',
      'jwt.claims.priority_group': 'User',
      role: 'ciip_industry_user'
    };
  }

  if (AS_REPORTER) {
    return {
      'jwt.claims.sub': '809217a1-34b8-4179-95bc-6b4410b4fe16',
      'jwt.claims.user_groups': 'User',
      'jwt.claims.priority_group': 'User',
      role: 'ciip_industry_user'
    };
  }

  if (AS_ANALYST) {
    return {
      'jwt.claims.sub': '9e96cf52-9316-434e-878d-2d926a80ac8f',
      'jwt.claims.user_groups': 'Incentive Analyst',
      'jwt.claims.priority_group': 'Incentive Analyst',
      role: 'ciip_analyst'
    };
  }

  if (AS_ADMIN) {
    return {
      'jwt.claims.sub': 'eabdeef2-f95a-4dd5-9908-883b45d213ba',
      'jwt.claims.user_groups': 'Incentive Administrator',
      'jwt.claims.priority_group': 'Incentive Administrator',
      role: 'ciip_administrator'
    };
  }

  if (AS_PENDING) {
    return {
      'jwt.claims.sub': '00000000-0000-0000-0000-000000000000',
      'jwt.claims.user_groups': 'Pending Analyst',
      'jwt.claims.priority_group': 'Pending Analyst',
      role: 'ciip_guest'
    };
  }

  const groups = getUserGroups(req);
  const priorityGroup = getPriorityGroup(groups);

  const claims = {
    role: groupData[priorityGroup].pgRole
  };
  if (
    !req.kauth ||
    !req.kauth.grant ||
    !req.kauth.grant.id_token ||
    !req.kauth.grant.id_token.content
  )
    return {
      ...claims
    };

  // TODOx: actually map jwt realms to postgres roles
  // @see https://www.postgresql.org/docs/current/default-roles.html
  // claims['role'] = 'pg_monitor';
  const token = req.kauth.grant.id_token.content;

  token.user_groups = groups.join(',');
  token.priority_group = priorityGroup;

  const properties = [
    'jti',
    'exp',
    'nbf',
    'iat',
    'iss',
    'aud',
    'sub',
    'typ',
    'azp',
    'auth_time',
    'session_state',
    'acr',
    'email_verified',
    'name',
    'preferred_username',
    'given_name',
    'family_name',
    'email',
    'broker_session_id',
    'user_groups',
    'priority_group'
  ];
  properties.forEach((property) => {
    claims[`jwt.claims.${property}`] = token[property];
  });

  return {
    ...claims
  };
};

module.exports = authenticationPgSettings;
