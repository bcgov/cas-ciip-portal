-- Revert ggircs-portal:table_facility from pg

begin;

drop table ggircs_portal.facility;
drop function ggircs_portal_private.get_valid_facility_organisation;

commit;
