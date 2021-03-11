-- Revert ggircs-portal:database_functions/upsert_timestamp_columns from pg

begin;

drop function ggircs_portal_private.upsert_timestamp_columns;

commit;
