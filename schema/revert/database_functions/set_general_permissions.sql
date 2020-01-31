-- Revert ggircs-portal:set_general_permissions from pg

begin;

  revoke usage on schema ggircs_portal from ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  revoke usage on schema swrs from ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  revoke select on all tables in schema swrs from ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

commit;
