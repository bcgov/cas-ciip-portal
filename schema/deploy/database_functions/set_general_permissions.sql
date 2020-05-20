-- Deploy ggircs-portal:set_general_permissions to pg
-- requires: schema_ggircs_portal

begin;

  grant usage on schema ggircs_portal to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  grant usage on schema ggircs_portal_private to ciip_administrator, ciip_analyst, ciip_industry_user;

  grant usage on schema swrs to ciip_administrator, ciip_analyst, ciip_industry_user;
  grant select on all tables in schema swrs to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
