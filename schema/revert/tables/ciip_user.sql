-- Revert ggircs-portal:table_user from pg

begin;

drop trigger if exists graphile_worker_job on ggircs_portal.ciip_user;
drop function if exists ggircs_portal.run_graphile_job;
drop table ggircs_portal.ciip_user;

commit;
