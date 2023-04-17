-- Revert ggircs-portal:tables/emission_factor from pg

begin;

drop table ggircs_portal.emission_factor;

commit;
