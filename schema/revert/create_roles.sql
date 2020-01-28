-- Revert ggircs-portal:create_roles from pg

begin;

revoke all privileges on all tables in schema ggircs_portal from administrator;
revoke all privileges on all functions in schema ggircs_portal from administrator;
  revoke all privileges on schema ggircs_portal from administrator;
drop role administrator;

revoke all privileges on all tables in schema ggircs_portal from analyst;
revoke all privileges on all functions in schema ggircs_portal from analyst;
revoke all privileges on schema ggircs_portal from analyst;
drop role analyst;

revoke all privileges on all tables in schema ggircs_portal from industry_user;
revoke all privileges on all functions in schema ggircs_portal from industry_user;
revoke all privileges on schema ggircs_portal from industry_user;
drop role industry_user;

revoke all privileges on all tables in schema ggircs_portal from guest;
revoke all privileges on all functions in schema ggircs_portal from guest;
revoke all privileges on schema ggircs_portal from guest;
drop role guest;

commit;
