-- Deploy ggircs-portal:set_general_permissions to pg
-- requires: schema_ggircs_portal

begin;

  grant usage on schema ggircs_portal to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;
  -- TODO: Audit which functions should be executable by whom
  grant execute on all functions in schema ggircs_portal to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

commit;
