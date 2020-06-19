-- Revert ggircs-portal:tables/session from pg

begin;

drop table ggircs_portal_private.session;

commit;
