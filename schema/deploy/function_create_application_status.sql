-- Deploy ggircs-portal:function_create_application_status to pg
-- requires: table_application_status
-- requires: table_form_json

BEGIN;

create or replace function ggircs_portal.create_application_status()
    returns trigger as
    $function$
        begin
            insert into ggircs_portal.application_status(application_status, form_json_id)
            values ('pending', 1)
            return null;
        end
    $function$ language plpgsql volatile;

COMMIT;
