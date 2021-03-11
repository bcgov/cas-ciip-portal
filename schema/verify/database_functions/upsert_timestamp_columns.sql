-- Verify ggircs-portal:database_functions/upsert_timestamp_columns on pg

begin;

select pg_get_functiondef('ggircs_portal_private.upsert_timestamp_columns(text,text,boolean,boolean,boolean)'::regprocedure);

rollback;
