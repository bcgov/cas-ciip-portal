-- Revert ggircs-portal:function_import_from_swrs from pg

begin;

drop function ggircs_portal.get_swrs_operator_contact_data;
drop type ggircs_portal.operator_contact_data;

commit;
