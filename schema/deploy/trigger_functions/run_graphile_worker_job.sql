-- Deploy ggircs-portal:trigger_functions/run_graphile_worker_job to pg
-- requires: schema_ggircs_portal

begin;

create or replace function ggircs_portal_private.run_graphile_worker_job() returns trigger as $$
declare
  application_details record;
  certifier_details record;
  status_change_type text;
begin
  case
    -- **ON NEW USER REGISTRATION**
    -- Send welcome email after registering for CIIP program
    when tg_argv[0]='welcome' then
      perform ggircs_portal_private.graphile_worker_job_definer('sendMail', json_build_object('type', tg_argv[0], 'firstName', new.first_name, 'lastName', new.last_name, 'email', new.email_address));
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
            from ggircs_portal.application_revision ar
            join ggircs_portal.application a
            on ar.application_id = a.id
            and new.application_id = ar.application_id
            and new.version_number = ar.version_number
            join ggircs_portal.facility f
            on a.facility_id = f.id
            join ggircs_portal.organisation o
            on f.organisation_id = o.id
            join ggircs_portal.ciip_user u
            on u.id = ar.created_by
            )
      select operator_name, facility_name, first_name, last_name, email_address from ad into application_details;
      -- Choose type of email to sent based on what the status of the application has been changed to
      case
        when new.application_revision_status = 'submitted' then
          status_change_type := 'status_change_submitted';
        else
          status_change_type := 'status_change_other';
        -- TODO: Do we want different emails for each status change? Or is submitted / other enough?
        -- when new.application_revision_status = 'requested changes' then
        --   status_change_type := 'status_change_requested_changes';
        -- when new.application_revision_status = 'approved' then
        --   status_change_type := 'status_change_approved';
        -- when new.application_revision_status = 'rejected' then
        --   status_change_type := 'status_change_rejected';
      end case;

      -- Assign worker to the sendMail task
      perform ggircs_portal_private.graphile_worker_job_definer('sendMail',
            json_build_object(
              'type', status_change_type,
              'firstName', application_details.first_name,
              'lastName', application_details.last_name,
              'email', application_details.email_address,
              'facilityName', application_details.facility_name,
              'operatorName', application_details.operator_name,
              'status', new.application_revision_status));
      return new;

    -- **ON REQUEST FOR CERTIFICATION**
    when tg_argv[0] = 'certification_request' then

      if (new.send_certification_request = true) then

        with ad as (select o.operator_name, f.facility_name, u.first_name, u.last_name, u.email_address
              from ggircs_portal.application_revision ar
              join ggircs_portal.application a
              on ar.application_id = a.id
              and new.application_id = ar.application_id
              and new.version_number = ar.version_number
              join ggircs_portal.facility f
              on a.facility_id = f.id
              join ggircs_portal.organisation o
              on f.organisation_id = o.id
              join ggircs_portal.ciip_user u
              on u.id = new.created_by
              )
        select operator_name, facility_name, first_name, last_name, email_address from ad into application_details;

        perform ggircs_portal_private.graphile_worker_job_definer('sendMail',
              json_build_object(
                'type', 'certification_request',
                'certifierUrl', new.certifier_url,
                'reporterEmail', application_details.email_address,
                'firstName', application_details.first_name,
                'lastName', application_details.last_name,
                'email', new.certifier_email,
                'facilityName', application_details.facility_name,
                'operatorName', application_details.operator_name));

        -- timestamp when the email was sent
        new.certification_request_sent_at = now();
    end if;
    return new;

      -- **ON SIGNED BY CERTIFIER**
    when tg_argv[0] = 'signed_by_certifier' then

      with ad as (select o.operator_name, f.facility_name, u.first_name, u.last_name, u.email_address
            from ggircs_portal.application_revision ar
            join ggircs_portal.application a
            on ar.application_id = a.id
            and new.application_id = ar.application_id
            and new.version_number = ar.version_number
            join ggircs_portal.facility f
            on a.facility_id = f.id
            join ggircs_portal.organisation o
            on f.organisation_id = o.id
            join ggircs_portal.ciip_user u
            on u.id = new.created_by
            )
      select operator_name, facility_name, first_name, last_name, email_address from ad into application_details;

      with certifier as (select u.first_name, u.last_name from ggircs_portal.ciip_user u where u.id = new.certified_by)
      select first_name, last_name from certifier into certifier_details;

      perform ggircs_portal_private.graphile_worker_job_definer('sendMail',
            json_build_object(
              'type', 'signed_by_certifier',
              'email', application_details.email_address,
              'firstName', application_details.first_name,
              'lastName', application_details.last_name,
              'certifierEmail', new.certifier_email,
              'facilityName', application_details.facility_name,
              'operatorName', application_details.operator_name,
              'certifierFirstName', certifier_details.first_name,
              'certifierLastName', certifier_details.last_name));
      return new;

    -- **ON SIGNED BY CERTIFIER**
    when tg_argv[0] = 'recertification' then

      with ad as (select o.operator_name, f.facility_name, u.first_name, u.last_name, u.email_address
            from ggircs_portal.application_revision ar
            join ggircs_portal.application a
            on ar.application_id = a.id
            and new.application_id = ar.application_id
            and new.version_number = ar.version_number
            join ggircs_portal.facility f
            on a.facility_id = f.id
            join ggircs_portal.organisation o
            on f.organisation_id = o.id
            join ggircs_portal.ciip_user u
            on u.id = new.created_by
            )
      select operator_name, facility_name, first_name, last_name, email_address from ad into application_details;

      with certifier as (select u.first_name, u.last_name from ggircs_portal.ciip_user u where u.id = new.certified_by)
      select first_name, last_name from certifier into certifier_details;

      perform ggircs_portal_private.graphile_worker_job_definer('sendMail',
            json_build_object(
              'type', 'recertification',
              'email', application_details.email_address,
              'firstName', application_details.first_name,
              'lastName', application_details.last_name,
              'facilityName', application_details.facility_name,
              'operatorName', application_details.operator_name));
      new.recertification_request_sent=true;
      return new;
  end case;
end;
$$ language plpgsql volatile;

comment on function ggircs_portal_private.run_graphile_worker_job is 'Trigger function runs a graphile-worker job upon being called';

commit;
