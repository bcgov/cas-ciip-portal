-- Deploy ggircs-portal:database_functions/graphile_worker_job_definer to pg
-- requires: schema_ggircs_portal_private

begin;

create or replace function ggircs_portal_private.graphile_worker_job_definer(task text, payload json)
returns void as $$
  declare
    calls_past_minute int;
    defer_run_multiplier int;
  begin

    calls_past_minute := (select count(*) from ggircs_portal_private.graphile_worker_timestamp where called_at > (now() - interval '1 minute'));
    defer_run_multiplier := (calls_past_minute/100);

    perform graphile_worker.add_job(task, payload, run_at := now() + ((defer_run_multiplier) * INTERVAL '1 minute'));
    insert into ggircs_portal_private.graphile_worker_timestamp(called_at) values (now() + ((defer_run_multiplier) * INTERVAL '1 minute'));

  end;
$$ language plpgsql volatile security definer;

commit;
