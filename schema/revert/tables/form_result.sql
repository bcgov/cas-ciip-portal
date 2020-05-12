-- Revert ggircs-portal:table_form_result from pg

begin;

drop table ggircs_portal.form_result;

commit;
