-- Deploy ggircs-portal:function_session to pg
-- requires: schema_ggircs_portal
-- requires: type_jwt_token

begin;

create or replace function ggircs_portal.session()
  returns ggircs_portal.jwt_token as $function$
    select (
      current_setting('jwt.claims.jti', true),
      current_setting('jwt.claims.exp', true),
      current_setting('jwt.claims.nbf', true),
      current_setting('jwt.claims.iat', true),
      current_setting('jwt.claims.iss', true),
      current_setting('jwt.claims.aud', true),
      current_setting('jwt.claims.sub', true),
      current_setting('jwt.claims.typ', true),
      current_setting('jwt.claims.azp', true),
      current_setting('jwt.claims.auth_time', true),
      current_setting('jwt.claims.session_state', true),
      current_setting('jwt.claims.acr', true),
      current_setting('jwt.claims.email_verified', true),
      current_setting('jwt.claims.name', true),
      current_setting('jwt.claims.preferred_username', true),
      current_setting('jwt.claims.given_name', true),
      current_setting('jwt.claims.family_name', true),
      current_setting('jwt.claims.email', true)
    )::ggircs_portal.jwt_token;
  $function$ language sql stable strict;


commit;
