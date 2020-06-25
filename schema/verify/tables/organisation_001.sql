-- Verify ggircs-portal:tables/organisation_001 on pg

begin;

select exists(
  select * from pg_indexes
  where schemaname='ggircs_portal'
  and tablename='organisation'
  and indexname='organisation_swrs_organisation_id_uindex'
);

rollback;
