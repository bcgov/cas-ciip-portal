-- Verify ggircs-portal:function_get_carbon_tax_data on pg

begin;

select ggircs_portal_private.verify_function_not_present('ggircs_portal.application_current_user_can_edit');
select ggircs_portal_private.verify_type_not_present('carbon_tax_data');

rollback;
