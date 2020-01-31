-- Deploy ggircs-portal:function_application_latest_draft_version_number to pg
-- requires: table_application_revision_status

begin;

  create or replace function ggircs_portal.application_latest_draft_revision(
    application ggircs_portal.application
  )
    returns ggircs_portal.application_revision
    as
    $function$
    declare
    result ggircs_portal.application_revision;
    begin
      with x as (
        select max(version_number) as max from ggircs_portal.application_revision_status as _status
          where _status.application_id = application.id and _status.application_revision_status = 'draft')
        select r.* from ggircs_portal.application_revision r
          where r.application_id = application.id
          and r.version_number = (select x.max from x) into result;
      return result;
    end;
    $function$
      language 'plpgsql' stable;

  grant execute on function ggircs_portal.application_latest_draft_revision to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

commit;
