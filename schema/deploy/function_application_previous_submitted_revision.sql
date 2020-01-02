-- Deploy ggircs-portal:function_application_previous_submitted_revision to pg
-- requires: table_application_revision_status

begin;

  create or replace function ggircs_portal.application_previous_submitted_revision(
    application ggircs_portal.application
  )
    returns ggircs_portal.application_revision
    as
    $function$
    declare
    result ggircs_portal.application_revision;
    max_version int;
    begin
      max_version := (select max(version_number) as max from ggircs_portal.application_revision_status as _status
          where _status.application_id = application.id and _status.application_revision_status != 'draft');

      if (max_version < 2)
        then return null;
      else
        select r.* from ggircs_portal.application_revision r
          where r.application_id = application.id
          and r.version_number = (max_version - 1) into result;
        return result;
      end if;
    end;
    $function$
      language 'plpgsql' stable;
commit;
