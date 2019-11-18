-- Revert ggircs-portal:table_user_organisation from pg

begin;

drop table  ggircs_portal.ciip_user_organisation;

commit;
