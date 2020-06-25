-- Verify ggircs-portal:tables/facility_001 on pg

begin;

select exists(
  select * from pg_indexes
  where schemaname='ggircs_portal'
  and tablename='facility'
  and indexname='facility_swrs_facility_id_uindex'
);

rollback;
