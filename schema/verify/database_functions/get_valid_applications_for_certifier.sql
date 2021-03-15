-- Verify ggircs-portal:database_functions/get_valid_applications_for_certifier on pg

begin;

select ggircs_portal_private.verify_function_not_present('ggircs_portal_private.get_valid_applications_for_certifier');

rollback;
