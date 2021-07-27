-- Deploy ggircs-portal:tables/emission_category_001 to pg
-- requires: tables/emission_category

begin;

alter table ggircs_portal.emission_category add column carbon_taxed boolean default true;
alter table ggircs_portal.emission_category add column category_definition varchar(100000);

comment on table ggircs_portal.emission_category is 'Table of emission categories used in the CIIP program as defined in Schedule A / Schedule B of the Greenhouse Gas Industrial Reporting and Control Act (https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/249_2015#ScheduleA)';
comment on column ggircs_portal.emission_category.carbon_taxed is 'Boolean carbon_taxed column indicates whether or not a fuel reported in this category is taxed';
comment on column ggircs_portal.emission_category.category_definition is 'Definition of the emission_category as defined in Schedule A / Schedule B of the Greenhouse Gas Industrial Reporting and Control Act (https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/249_2015#ScheduleA)';

commit;
