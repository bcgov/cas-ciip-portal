-- Deploy ggircs-portal:function_application_latest_submitted_version_number to pg
-- requires: table_application_revision_status

begin;

  create or replace function ggircs_portal.application_latest_submitted_version_number(
    application ggircs_portal.application
  )
  returns integer
  as
  $function$
  begin
    return (
      select max(version_number) from ggircs_portal.application_revision_status as _status
        where _status.application_id = application.id and _status.application_revision_status != 'draft'
    );
  end;
  $function$
      language 'plpgsql' stable;
commit;
