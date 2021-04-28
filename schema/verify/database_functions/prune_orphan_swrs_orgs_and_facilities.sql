-- Verify ggircs-portal:database_functions/prune_orphan_swrs_orgs_and_facilities on pg

begin;

select pg_get_functiondef('ggircs_portal_private.prune_orphan_swrs_orgs_and_facilities()'::regprocedure);

rollback;
