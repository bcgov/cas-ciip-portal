-- Revert ggircs-portal:table_form_json from pg

BEGIN;

drop table  ggircs_portal.form_json;

COMMIT;
