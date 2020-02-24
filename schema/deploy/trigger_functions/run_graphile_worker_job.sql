-- Deploy ggircs-portal:trigger_functions/run_graphile_worker_job to pg
-- requires: schema_ggircs_portal

begin;

create or replace function ggircs_portal_private.run_graphile_worker_job() returns trigger as $$
declare
  application_details record;
  status_change_type text;
begin
  case
    -- **ON NEW USER REGISTRATION**
    -- Send welcome email after registering for CIIP program
    when tg_argv[0]='welcome' then
      perform graphile_worker.add_job('sendMail', json_build_object('type', tg_argv[0], 'firstName', new.first_name, 'lastName', new.last_name, 'email', new.email_address));
      return new;

    -- **ON APPLICATION REVISION STATUS CHANGE**
    -- Notify reporter when the status of their application has changed
    when tg_argv[0]='status_change' then

      -- Do not send any mail when a draft revision is created
      if (new.application_revision_status = 'draft') then
        return new;
      end if;

      -- Get application details
      with ad as (select o.operator_name, f.facility_name, u.first_name, u.last_name, u.email_address
            from ggircs_portal.application a
            join ggircs_portal.facility f
            on a.facility_id = f.id
            join ggircs_portal.organisation o
            on f.organisation_id = o.id
            join ggircs_portal.ciip_user_organisation cuo
            on o.id = cuo.organisation_id
            join ggircs_portal.ciip_user u
            on u.id = cuo.user_id
            and new.application_id = a.id)
      select operator_name, facility_name, first_name, last_name, email_address from ad into application_details;
      -- Choose type of email to sent based on what the status of the application has been changed to
      case
        when new.application_revision_status = 'submitted' then
          status_change_type := 'status_change_submitted';
        when new.application_revision_status = 'requested changes' then
          status_change_type := 'status_change_requested_changes';
        when new.application_revision_status = 'approved' then
          status_change_type := 'status_change_approved';
        when new.application_revision_status = 'rejected' then
          status_change_type := 'status_change_rejected';
      end case;

      -- Assign worker to the sendMail task
      perform graphile_worker.add_job('sendMail',
            json_build_object(
              'type', status_change_type,
              'firstName', application_details.first_name,
              'lastName', application_details.last_name,
              'email', application_details.email_address,
              'facilityName', application_details.facility_name,
              'operatorName', application_details.operator_name));
      return new;
  end case;
end;
$$ language plpgsql volatile;

commit;
