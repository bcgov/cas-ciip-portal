-- Revert ggircs-portal:table_user_organisation from pg

begin;

drop table  ggircs_portal.user_organisation;

commit;
