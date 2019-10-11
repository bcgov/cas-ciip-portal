-- Revert ggircs-portal:table_benchmark from pg

begin;

drop table ggircs_portal.benchmark;

commit;
