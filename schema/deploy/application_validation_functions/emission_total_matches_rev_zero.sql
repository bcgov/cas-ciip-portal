-- Deploy ggircs-portal:application_validation_functions/emission_total_matches_rev_zero to pg

begin;

create or replace function ggircs_portal.emission_total_matches_rev_zero(application_revision ggircs_portal.application_revision)
  returns boolean as
  $func$
    declare
      swrs_revision ggircs_portal.application_revision;
      total_ciip_emissions numeric;
      total_swrs_emissions numeric;
    begin
      swrs_revision := (select * from ggircs_portal.application_revision where application_id = application_revision.application_id and version_number = 0);
      total_ciip_emissions := ggircs_portal.application_revision_total_ciip_emissions(application_revision);
      total_swrs_emissions := ggircs_portal.application_revision_total_ciip_emissions(swrs_revision);

      return abs(total_ciip_emissions - total_swrs_emissions) < 10;
    end;
  $func$
language 'plpgsql' stable;

commit;
