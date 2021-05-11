begin;

with rows as (
insert into ggircs_portal.application_revision_validation_function(validation_function_name, validation_description, validation_failed_message)
values
(
  'emission_category_missing_fuel',
  'Application has a fuel reported for every emission category where an emission was reported',
  'There are no reported fuels in some emission categories where emissions were reported. Please report fuels corresponding to all emission categories with reported emissions.'
),
(
  'emission_total_matches_rev_zero',
  'Emissions in this application match the emissions reported in swrs within 10 tCO2e',
  'Emissions reported in CIIP do not match emissions reported in SWRS. If the emissions as reported in CIIP are correct, please ensure you also update reported emissions in SWRS.'
),
(
  'no_reported_ciip_product',
  'Application has at least one ciip product reported',
  'There is no reported production of a primary (non-energy) product. At least one product must be reported.'
),
(
  'mandatory_products_are_reported',
  'All mandatory products for this application''s NAICS code are reported',
  'Some mandatory products for this application''s NAICS code have not been reported. Please navigate to the "Production" form and report any missing products.'
),
(
  'carbon_taxed_fuels_match_rev_zero',
  'Reported carbon-taxed fuel quantities in this application are within 0.1% of the quantities reported in SWRS',
  'The fuel amounts reported here do not match the fuel amounts that were reported in SWRS. If the fuels as reported here for CIIP are correct, please ensure you also update the reported fuels in SWRS.'
)
on conflict(validation_function_name)
do update
set
validation_description=excluded.validation_description, validation_failed_message=excluded.validation_failed_message
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.application_revision_function' from rows;

commit;
