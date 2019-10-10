-- Revert ggircs-portal:function_ciip_application_by_row_id from pg

begin;

drop function ggircs_portal.ciip_application_by_row_id;

commit;
