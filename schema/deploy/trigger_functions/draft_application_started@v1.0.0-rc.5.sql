-- Deploy ggircs-portal:trigger_functions/draft_application_started to pg
-- requires: schema_ggircs_portal

begin;

create or replace function ggircs_portal_private.draft_application_started() returns trigger as $$
declare
  user_details record;
  operation_details record;
begin

  with ud as (
    select cu.first_name, cu.last_name, cu.email_address
      from ggircs_portal.ciip_user cu
      where cu.uuid = (select sub from ggircs_portal.session())
  )
  select * from ud into user_details;

  with od as (
    select f.facility_name, o.operator_name
      from ggircs_portal.facility f
      join ggircs_portal.organisation o
      on o.id = f.organisation_id
      and f.id = new.facility_id
  )
  select * from od into operation_details;

    perform ggircs_portal_private.graphile_worker_job_definer(
      'sendMail',
      json_build_object(
        'type', 'draft_application_started',
        'firstName', user_details.first_name,
        'lastName', user_details.last_name,
        'email', user_details.email_address,
        'operatorName', operation_details.operator_name,
        'facilityName', operation_details.facility_name
      )
    );

  return new;
end;
$$ language plpgsql volatile;

comment on function ggircs_portal_private.draft_application_started is 'Trigger function sends an email upon being called';

commit;
