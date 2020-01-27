-- Deploy ggircs-portal:create_roles to pg
-- requires: schema_ggircs_portal

begin;

create role Administrator;
create role Analyst;
create role Industry_User;
create role Guest;

commit;
