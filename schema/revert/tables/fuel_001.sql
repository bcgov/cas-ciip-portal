-- Revert ggircs-portal:tables/fuel_001 from pg

begin;

alter table ggircs_portal.fuel drop column comments;

commit;
