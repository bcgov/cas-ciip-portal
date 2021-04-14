-- Deploy ggircs-portal:computed_columns/application_current_user_can_edit to pg
-- requires: tables/ciip_user_organisation
-- requires: tables/application

begin;
  drop function ggircs_portal.application_current_user_can_edit;
commit;
