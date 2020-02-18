-- Revert ggircs-portal:computed_columns/ciip_incentive from pg

begin;

drop function ggircs_portal.application_revision_ciip_incentive;

commit;
