-- Deploy ggircs-portal:trigger_functions/check_for_immutable_application_revision_status to pg
-- requires: schema_ggircs_portal_private

begin;

create or replace function ggircs_portal_private.check_for_immutable_application_revision_status()
  returns trigger as $$
    begin
      if (new.version_number != 0 and new.version_number < (select max(version_number) from ggircs_portal.application_revision ar where ar.application_id = new.application_id)) then
          raise exception 'You cannot change the status of an application revision unless it is the current version';
      end if;
      return new;
    end;
  $$ language plpgsql;

grant execute on function ggircs_portal_private.check_for_immutable_application_revision_status to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal_private.check_for_immutable_application_revision_status is 'a trigger function that throws an exception if the status of a non-current version of an application is being changed';

commit;
