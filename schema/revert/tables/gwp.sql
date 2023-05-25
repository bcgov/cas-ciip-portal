-- Revert ggircs-portal:tables/gwp from pg

begin;

drop table ggircs_portal.gwp;

commit;
