-- Revert ggircs-portal:tables/emission_category from pg

begin;

drop table ggircs_portal.emission_category;

commit;
