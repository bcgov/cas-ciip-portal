-- Deploy ggircs-portal:create_roles to pg
-- requires: schema_ggircs_portal

begin;

do
$do$
begin
   if not exists (
      select 1
      from   pg_catalog.pg_roles
      where  rolname = 'ciip_administrator') then

      create role ciip_administrator;
   end if;
   if not exists (
      select 1
      from   pg_catalog.pg_roles
      where  rolname = 'ciip_analyst') then

      create role ciip_analyst;
   end if;
   if not exists (
      select 1
      from   pg_catalog.pg_roles
      where  rolname = 'ciip_industry_user') then

      create role ciip_industry_user;
   end if;
   if not exists (
      select 1
      from   pg_catalog.pg_roles
      where  rolname = 'ciip_guest') then

      create role ciip_guest;
   end if;

end
$do$;

commit;
