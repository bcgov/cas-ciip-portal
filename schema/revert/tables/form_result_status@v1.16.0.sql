-- Revert ggircs-portal:tables/form_result_status from pg

begin;

drop table  ggircs_portal.form_result_status;

commit;
