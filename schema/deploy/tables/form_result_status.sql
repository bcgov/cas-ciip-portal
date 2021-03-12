-- Deploy ggircs-portal:tables/form_result_status to pg
-- requires: tables/form_result

begin;

drop table ggircs_portal.form_result_status;

commit;
