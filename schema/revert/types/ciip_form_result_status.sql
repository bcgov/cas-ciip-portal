-- Revert ggircs-portal:types/ciip_form_result_status from pg

begin;

drop type ggircs_portal.ciip_form_result_status;

commit;
