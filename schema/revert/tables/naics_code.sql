-- Revert ggircs-portal:tables/naics_code from pg

begin;

drop table ggircs_portal.naics_code;

commit;
