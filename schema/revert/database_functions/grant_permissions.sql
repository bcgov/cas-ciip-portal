-- Revert ggircs-portal:database_functions/grant_permissions from pg


begin;

  revoke all privileges on all tables in schema ggircs_portal from ciip_administrator;
  revoke all privileges on all functions in schema ggircs_portal from ciip_administrator;
  revoke all privileges on schema ggircs_portal from ciip_administrator;

  revoke all privileges on all tables in schema ggircs_portal from ciip_analyst;
  revoke all privileges on all functions in schema ggircs_portal from ciip_analyst;
  revoke all privileges on schema ggircs_portal from ciip_analyst;

  revoke all privileges on all tables in schema ggircs_portal from ciip_industry_user;
  revoke all privileges on all functions in schema ggircs_portal from ciip_industry_user;
  revoke all privileges on schema ggircs_portal from ciip_industry_user;

  revoke all privileges on all tables in schema ggircs_portal from ciip_guest;
  revoke all privileges on all functions in schema ggircs_portal from ciip_guest;
  revoke all privileges on schema ggircs_portal from ciip_guest;

  drop function ggircs_portal_private.grant_permissions(text, text, text);
  drop function ggircs_portal_private.grant_permissions(text, text, text, text[]);
commit;
