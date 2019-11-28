-- Revert ggircs-portal:function_get_carbon_tax_data from pg

begin;

drop function ggircs_portal.get_carbon_tax_data;
drop type ggircs_portal.carbon_tax_data;

commit;
