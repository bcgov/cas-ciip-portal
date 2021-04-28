-- Verify ggircs-portal:swrs_functions/refresh_swrs_version_data on pg

begin;

select pg_get_functiondef('ggircs_portal_private.refresh_swrs_version_data()'::regprocedure);

rollback;
