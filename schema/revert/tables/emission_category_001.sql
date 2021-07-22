-- Revert ggircs-portal:tables/emission_category_001 from pg

begin;

alter table ggircs_portal.emission_category drop column carbon_taxed;

commit;
