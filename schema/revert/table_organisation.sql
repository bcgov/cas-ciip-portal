-- Revert ggircs-portal:table_organisation from pg

begin;

drop table  ggircs_portal.organisation;

commit;
