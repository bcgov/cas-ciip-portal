-- Revert ggircs-portal:tables/form_json_001 from pg

begin;

alter table ggircs_portal.form_json drop column default_form_result;

commit;
