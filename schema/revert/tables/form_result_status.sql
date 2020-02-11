-- Revert ggircs-portal:tables/form_result_status from pg

begin;

drop table  ggircs_portal.form_result_status;
drop function ggircs_portal_private.get_valid_form_result_status_applications;

commit;
