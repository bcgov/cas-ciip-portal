-- Revert ggircs-portal:gas from pg

begin;

drop table ggircs_portal.gas;

commit;
