-- Revert ggircs-portal:tables/naics from pg

begin;

drop table ggircs_portal.naics;

commit;
