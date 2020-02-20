-- Deploy ggircs-portal:trigger_functions/run_graphile_worker_job to pg
-- requires: schema_ggircs_portal

begin;

create function ggircs_portal.run_graphile_worker_job() returns trigger as $$
begin
  perform graphile_worker.add_job('mail', json_build_object('firstName', new.first_name, 'lastName', new.last_name, 'email', new.email_address));
  return new;
end;
$$ language plpgsql volatile;

commit;
