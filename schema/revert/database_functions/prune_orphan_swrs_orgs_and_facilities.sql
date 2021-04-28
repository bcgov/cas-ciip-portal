-- Revert ggircs-portal:database_functions/prune_orphan_swrs_orgs_and_facilities from pg

begin;

drop function ggircs_portal_private.prune_orphan_swrs_orgs_and_facilities;

commit;
