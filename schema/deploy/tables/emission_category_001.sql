-- Deploy ggircs-portal:tables/emission_category_001 to pg
-- requires: tables/emission_category

begin;

alter table ggircs_portal.emission_category add column carbon_taxed boolean default true;

comment on column ggircs_portal.emission_category.carbon_taxed is 'Boolean carbon_taxed column indicates whether or not a fuel reported in this category is taxed';

commit;
