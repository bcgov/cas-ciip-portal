-- Revert ggircs-portal:tables/organisation_001 from pg

begin;

drop index organisation_swrs_organisation_id_uindex;

commit;
