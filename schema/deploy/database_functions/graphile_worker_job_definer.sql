-- Deploy ggircs-portal:database_functions/graphile_worker_job_definer to pg
-- requires: schema_ggircs_portal_private

begin;

create or replace function ggircs_portal_private.graphile_worker_job_definer(task text, payload json)
returns void as $$
  begin
    perform graphile_worker.add_job(task, payload);
  end;
$$ language plpgsql volatile security definer;

commit;
