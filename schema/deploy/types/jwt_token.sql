-- Deploy ggircs-portal:type_jwt_token to pg
-- requires: schema_ggircs_portal

begin;

create type ggircs_portal.jwt_token as (
  jti uuid,
  exp integer,
  nbf integer,
  iat integer,
  iss text,
  aud text,
  sub uuid,
  typ text,
  azp text,
  auth_time integer,
  session_state uuid,
  acr text,
  email_verified boolean,
  name text,
  preferred_username text,
  given_name text,
  family_name text,
  email text,
  broker_session_id text,
  priority_group text,
  user_groups text[]
);

comment on type ggircs_portal.jwt_token is E'@primaryKey sub\n@foreignKey (sub) references ciip_user (uuid)';

-- TODO: should be conformant with https://tools.ietf.org/html/rfc7519
-- Sample payload from Keycloak via IDIR provider
--  { jti: 'a090bc6c-dccd-4e55-857c-eb1a7bda2034',
--    exp: 1571273650,
--    nbf: 0,
--    iat: 1571273350,
--    iss: 'https://sso-dev.pathfinder.gov.bc.ca/auth/realms/pisrwwhx',
--    aud: 'cas-ciip-portal',
--    sub: '46d2dafb-f48f-4782-838c-37d6a3e2d34a',
--    typ: 'ID',
--    azp: 'cas-ciip-portal',
--    auth_time: 1571272904,
--    session_state: 'e0444b80-0ce0-4ea6-a3e6-5a227122af3c',
--    acr: '0',
--    broker_session_id: 'idir.93e47291-35a5-43df-b184-5fceea1aee29',
--    email_verified: false,
--    name: 'Alec Wenzowski',
--    preferred_username: 'awenzows@idir',
--    given_name: 'Alec',
--    family_name: 'Wenzowski',
--    email: 'alec.wenzowski@gov.bc.ca' }

commit;
