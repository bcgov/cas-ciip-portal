-- Deploy ggircs-portal:trigger_functions/request_for_organisation_access to pg
-- requires: schema_ggircs_portal

begin;

create or replace function ggircs_portal_private.request_for_organisation_access() returns trigger as $$
declare
  first_name text;
  last_name text;
  email_address text;
  operator_name text;
begin

  first_name= (select cu.first_name from ggircs_portal.ciip_user cu where id = new.user_id);
  last_name= (select cu.last_name from ggircs_portal.ciip_user cu where id = new.user_id);
  email_address= (select cu.email_address from ggircs_portal.ciip_user cu where id = new.user_id);
  operator_name = (select cu.operator_name from ggircs_portal.organisation cu where id = new.organisation_id);

  perform ggircs_portal_private.graphile_worker_job_definer(
    'sendMail',
    json_build_object(
      'type', 'request_for_organisation_access',
      'firstName', first_name,
      'lastName', last_name,
      'email', email_address,
      'operatorName', operator_name));

  perform ggircs_portal_private.graphile_worker_job_definer(
    'sendMail',
    json_build_object(
      'type', 'notify_admin_organisation_access',
      'operatorName', operator_name,
      'firstName', first_name,
      'lastName', last_name
    )
  );
  return new;
end;
$$ language plpgsql volatile;

comment on function ggircs_portal_private.request_for_organisation_access is 'Trigger function sends an email upon being called';

commit;
