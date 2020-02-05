-- Deploy ggircs-portal:trigger_functions/ensure_window_open_submit_application_status to pg

begin;

create or replace function ggircs_portal.ensure_window_open_submit_application_status()
  returns trigger as $$
    begin
      if (select reporting_year from ggircs_portal.opened_reporting_year()) is null then
        if (new.application_revision_status = 'submitted') then
          raise exception 'You cannot submit an application when the application window is closed';
        end if;
        if (new.application_revision_status = 'draft') then
          raise exception 'You cannot start a draft when the application window is closed';
        end if;
      end if;
      return new;
    end;
  $$ language plpgsql;

grant execute on function ggircs_portal.ensure_window_open_submit_application_status to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.ensure_window_open_submit_application_status is 'a trigger function that throws an exception if the application window is not opened and the new status is either "draft" or "submitted"';

commit;
