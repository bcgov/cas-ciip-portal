-- Deploy ggircs-portal:trigger_functions/organisation_access_approved to pg
-- requires: schema_ggircs_portal

begin;

create or replace function ggircs_portal_private.organisation_access_approved() returns trigger as $$
declare
  first_name text;
  last_name text;
  email_address text;
  operator_name text;
begin
  if (new.status = 'approved') then
    first_name= (select cu.first_name from ggircs_portal.ciip_user cu where id = new.user_id);
    last_name= (select cu.last_name from ggircs_portal.ciip_user cu where id = new.user_id);
    email_address= (select cu.email_address from ggircs_portal.ciip_user cu where id = new.user_id);
    operator_name= (select org.operator_name from ggircs_portal.organisation org where id = new.organisation_id);

    perform ggircs_portal_private.graphile_worker_job_definer(
      'sendMail',
      json_build_object(
        'type', 'organisation_access_approved',
        'firstName', first_name,
        'lastName', last_name,
        'email', email_address,
        'operatorName', operator_name,
        'organisationId', new.organisation_id));
  end if;
  return new;
end;
$$ language plpgsql volatile;

comment on function ggircs_portal_private.organisation_access_approved is 'Trigger function sends an email upon being called';

commit;
