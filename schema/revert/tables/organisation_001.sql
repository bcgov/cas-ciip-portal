-- Revert ggircs-portal:tables/organisation_001 from pg

begin;

drop index ggircs_portal.organisation_swrs_organisation_id_uindex;

commit;
