-- Deploy ggircs-portal:create_roles to pg
-- requires: schema_ggircs_portal

begin;

do
$do$
begin
   if not exists (
      select 1
      from   pg_catalog.pg_roles
      where  rolname = 'administrator') then

      create role administrator;
   end if;
   if not exists (
      select 1
      from   pg_catalog.pg_roles
      where  rolname = 'analyst') then

      create role analyst;
   end if;
   if not exists (
      select 1
      from   pg_catalog.pg_roles
      where  rolname = 'industry_user') then

      create role industry_user;
   end if;
   if not exists (
      select 1
      from   pg_catalog.pg_roles
      where  rolname = 'guest') then

      create role guest;
   end if;

   grant usage on schema ggircs_portal to administrator, analyst, industry_user, guest;
   grant execute on all functions in schema ggircs_portal to administrator, analyst, industry_user, guest;
end
$do$;

commit;
