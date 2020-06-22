set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(6);

select has_function(
  'ggircs_portal_private', 'graphile_worker_job_definer',
  'Function graphile_worker_job_definer should exist'
);

create or replace function ggircs_portal_private.graphile_worker_job_definer(task text, payload json)
returns void as $$
  declare
    calls_past_minute int;
    defer_run_multiplier int;
  begin

    calls_past_minute := (select count(*) from ggircs_portal_private.graphile_worker_timestamp where called_at > (now() - interval '1 minute'));
    defer_run_multiplier := (calls_past_minute/100);

    -- Update the function for test purposes, so it can be run without attempting to call the graphile_worker schema.
    -- perform graphile_worker.add_job(task, payload, run_at := now() + ((defer_run_multiplier) * INTERVAL '1 minute'));
    insert into ggircs_portal_private.graphile_worker_timestamp(called_at) values (now() + ((defer_run_multiplier) * INTERVAL '1 minute'));

  end;
$$ language plpgsql volatile security definer;

-- Test function adds a defined number of applications, which in turn calls graphile_worker_job_definer via a trigger
create or replace function add_apps(max int)
  returns void as $$
begin
  for i in 1..max loop
    perform ggircs_portal.create_application_mutation_chain(1);
  end loop;
end;
$$ language plpgsql;

select is_empty(
  $$
    select * from ggircs_portal_private.graphile_worker_timestamp;
  $$,
  'The graphile_worker_timestamp table is empty'
);

-- Make 201 calls to graphile_worker_job_definer
select add_apps(201);

select * from ggircs_portal_private.graphile_worker_timestamp;

select results_eq(
  $$
    select count(*) from ggircs_portal_private.graphile_worker_timestamp where called_at between now() - interval '1 minute' and now();
  $$,
  ARRAY['100'::bigint],
  'There are 100 entries in graphile_worker_timestamp where the timestamp is between now and now() - 1 minute'
);

select results_eq(
  $$
    select count(*) from ggircs_portal_private.graphile_worker_timestamp where called_at between now() + interval '1 second' and now() + interval '1 minute';
  $$,
  ARRAY['100'::bigint],
  'There are 100 entries in graphile_worker_timestamp where the timestamp is between now() and now() + 1 minute'
);

select results_eq(
  $$
    select count(*) from ggircs_portal_private.graphile_worker_timestamp where called_at between now() + interval '1 minute' + interval '1 second' and now() + interval '2 minutes';
  $$,
  ARRAY['1'::bigint],
  'There is one entry in graphile_worker_timestamp where the timestamp is between now() + 1 minute and now() + 2 minutes'
);

-- Make another call to graphile_worker_job_definer
select add_apps(1);

select results_eq(
  $$
    select count(*) from ggircs_portal_private.graphile_worker_timestamp where called_at between now() + interval '1 minute' + interval '1 second' and now() + interval '2 minutes';
  $$,
  ARRAY['2'::bigint],
  'There are two entries in graphile_worker_timestamp where the timestamp is between now() + 1 minute and now() + 2 minutes'
);

select finish();
rollback;
