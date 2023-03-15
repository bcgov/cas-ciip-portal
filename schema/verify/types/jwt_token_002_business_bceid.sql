-- Verify ggircs-portal:types/jwt_token_002_business_bceid on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'jwt_token'
    ), 'type "jwt_token" is not defined';
  end;
$$;

rollback;
