-- Revert ggircs-portal:tables/connect_session from pg

begin;

drop table ggircs_portal_private.connect_session;

commit;
