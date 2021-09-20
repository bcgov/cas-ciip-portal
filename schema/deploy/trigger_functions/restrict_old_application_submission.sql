-- Deploy ggircs-portal:trigger_functions/restrict_old_application_submission to pg
-- requires: function_opened_reporting_year
-- requires: tables/application_revision_status

begin;

create or replace function ggircs_portal_private.restrict_old_application_submission()
  returns trigger as $$
    begin
      if (select reporting_year from ggircs_portal.opened_reporting_year()) is not null
        and new.version_number = 1
        and (select reporting_year from ggircs_portal.application where id = new.application_id) != (select reporting_year from ggircs_portal.opened_reporting_year()) then
          if (new.application_revision_status = 'submitted')
            and (select application_revision_status from ggircs_portal.application_revision_status where application_id = new.application_id order by id desc limit 1) = 'draft'
          then
            raise exception 'You cannot submit a first version of an application for a previous year';
          end if;
          if (new.application_revision_status = 'draft') then
            raise exception 'You cannot start a draft application for a previous year';
          end if;
      end if;
      return new;
    end;
  $$ language plpgsql;

grant execute on function ggircs_portal_private.restrict_old_application_submission to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal_private.restrict_old_application_submission is 'a trigger function that throws an exception if an attempt is made to create a new application for a previous reporting year, or submit a first version of an application from a previous reporting year';

commit;
