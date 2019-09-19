-- Revert ggircs-portal:function_insert_dummy_application_data from pg

BEGIN;

drop function ggircs_portal.insert_dummy_application_data;

COMMIT;
