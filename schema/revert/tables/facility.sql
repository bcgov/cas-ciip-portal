-- Revert ggircs-portal:table_facility from pg

begin;

drop table ggircs_portal.facility;

commit;
