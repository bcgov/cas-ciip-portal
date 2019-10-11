-- Revert ggircs-portal:table_user from pg

begin;

drop table ggircs_portal.user;

commit;
