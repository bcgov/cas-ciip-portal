-- Revert ggircs-portal:table_form_json from pg

begin;

drop table  ggircs_portal.form_json;

commit;
