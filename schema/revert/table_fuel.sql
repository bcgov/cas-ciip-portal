-- Revert ggircs-portal:table_fuel from pg


begin;

drop table ggircs_portal.fuel;

commit;
