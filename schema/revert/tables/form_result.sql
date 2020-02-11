-- Revert ggircs-portal:table_form_result from pg

begin;

drop table ggircs_portal.form_result;
drop function ggircs_portal_private.get_valid_form_result_applications;

commit;
