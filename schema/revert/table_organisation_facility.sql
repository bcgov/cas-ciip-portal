-- Revert ggircs-portal:table_organisation_facility from pg

begin;

drop table  ggircs_portal.organisation_facility;

commit;