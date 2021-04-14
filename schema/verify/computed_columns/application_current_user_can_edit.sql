-- Verify ggircs-portal:computed_columns/application_current_user_can_edit on pg

begin;

select ggircs_portal_private.verify_function_not_present('ggircs_portal.application_current_user_can_edit');

rollback;
