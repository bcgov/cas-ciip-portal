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

commit;
