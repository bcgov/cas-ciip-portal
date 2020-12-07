-- Revert ggircs-portal:tables/form_result_001 from pg

begin;

drop trigger _immutable_form_result on ggircs_portal.form_result;

commit;
