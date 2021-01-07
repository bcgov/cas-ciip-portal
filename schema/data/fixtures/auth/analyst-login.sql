-- Session now returns
begin;

create or replace function ggircs_portal.session()
    returns ggircs_portal.jwt_token as
  \$\$
begin
  return (
    select row (
      current_setting('jwt.claims.jti', true),
      current_setting('jwt.claims.exp', true),
      current_setting('jwt.claims.nbf', true),
      current_setting('jwt.claims.iat', true),
      current_setting('jwt.claims.iss', true),
      current_setting('jwt.claims.aud', true),
      '9e96cf52-9316-434e-878d-2d926a80ac8f',
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
      current_setting('jwt.claims.email', true),
      current_setting('jwt.claims.broker_session_id', true),
      'Incentive Analyst',
      '{"Incentive Analyst"}'
      )::ggircs_portal.jwt_token
  );
end;
\$\$ language 'plpgsql' stable;

select set_config('role', 'ciip_analyst', true);

grant execute on function ggircs_portal.session to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

commit;
