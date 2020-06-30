-- Verify ggircs-portal:tables/application_001 on pg

begin;

select exists(
  select * from pg_indexes
  where schemaname='ggircs_portal'
  and tablename='application'
  and indexname='application_facility_year_uindex'
);

rollback;
