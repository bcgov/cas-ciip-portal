-- Deploy ggircs-portal:trigger_functions/immutable-form-result to pg
-- requires: schema_ggircs_portal_private

begin;
  create or replace function ggircs_portal_private.immutable_form_result()
    returns trigger as $$
  declare
    app_status text;
  begin

    select ars.application_revision_status::text into app_status
      from ggircs_portal.application_revision_status ars
      where ars.application_id = new.application_id
      and ars.version_number = new.version_number
      and ars.version_number != 0
      order by created_at desc limit 1;

    if (app_status='submitted') then
      raise exception 'Form_result is immutable after application has been submitted';
    end if;

    return new;
  end;
  $$ language plpgsql volatile;

comment on function ggircs_portal_private.immutable_form_result is 'Trigger function ensures form result is immutable if application has been submitted';

commit;
