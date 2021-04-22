-- Verify ggircs-portal:computed_columns/application_revision_facility_emission on pg

begin;

select pg_get_functiondef('ggircs_portal.application_revision_total_ciip_emissions(ggircs_portal.application_revision)'::regprocedure);

rollback;
