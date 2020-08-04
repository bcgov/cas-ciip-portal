-- Revert ggircs-portal:computed_columns/application_current_user_can_edit from pg

begin;

drop function ggircs_portal.application_current_user_can_edit;

commit;
