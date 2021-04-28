-- Deploy ggircs-portal:application_validation_functions/emission_total_matches_rev_zero to pg
-- requires: tables/application_revision_validation_function

begin;

create or replace function ggircs_portal.emission_total_matches_rev_zero(app_rev ggircs_portal.application_revision)
  returns boolean as
  $func$
    declare
      swrs_revision ggircs_portal.application_revision;
      total_ciip_emissions numeric;
      total_swrs_emissions numeric;
    begin
      swrs_revision := (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id = app_rev.application_id and version_number = 0);
      total_ciip_emissions := ggircs_portal.application_revision_total_ciip_emissions(app_rev);
      total_swrs_emissions := ggircs_portal.application_revision_total_ciip_emissions(swrs_revision);

      return abs(total_ciip_emissions - total_swrs_emissions) < 10;
    end;
  $func$
language 'plpgsql' stable;

comment on function ggircs_portal.emission_total_matches_rev_zero(app_rev ggircs_portal.application_revision) is
'This validation function for a CIIP (CleanBC Industrial Incentive Program) application determines if the emissions reported match the emissions reported in SWRS.';

grant execute on function ggircs_portal.emission_total_matches_rev_zero to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

insert into ggircs_portal.application_revision_validation_function(
  validation_function_name,
  validation_description,
  validation_failed_message)
values
  ('emission_total_matches_rev_zero',
  'Validates that for an application revision, the matching swrs emissions (revision 0) are within 10 tCO2e',
  'Emissions reported in CIIP do not match emissions reported in SWRS. If the emissions as reported in CIIP are correct, please ensure you also update reported emissions in SWRS.'
  );

commit;
