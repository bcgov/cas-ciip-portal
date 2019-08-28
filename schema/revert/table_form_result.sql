-- Revert ggircs-portal:table_form_result from pg

BEGIN;

drop table  ggircs_portal.form_result;

COMMIT;
