-- Revert ggircs-portal:function_session from pg

begin;

drop function if exists ggircs_portal.session;

commit;
