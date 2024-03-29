-- Deploy ggircs-portal:trigger_functions/checksum_form_results to pg
-- requires: tables/form_result

begin;

create or replace function ggircs_portal_private.checksum_form_results()
  returns trigger as $$
declare
  new_form_result_hash text;
  old_form_result_hash text;
  temp_row record;

begin

  if new.version_number > 1 then

    for temp_row in
      select form_id from ggircs_portal.ciip_application_wizard
    loop

      new_form_result_hash := (select md5((select form_result::text from ggircs_portal.form_result fr
                                          where fr.application_id = new.application_id
                                          and fr.form_id = temp_row.form_id
                                          and fr.version_number = new.version_number)));

      old_form_result_hash := (select md5((select form_result::text from ggircs_portal.form_result fr
                                          where fr.application_id = new.application_id
                                          and fr.form_id = temp_row.form_id
                                          and fr.version_number = new.version_number - 1)));
    end loop;
  end if;

  return new;
end;
$$ language plpgsql volatile;

grant execute on function ggircs_portal_private.checksum_form_results to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal_private.checksum_form_results()
  is $$
  a trigger to checksum the form_result columns from the current and previous versions of an application
  when the application_revision_status changes.
  example usage:

  create table some_schema.some_table (
    ...
    application_revision_status jsonb
  );
  create trigger _checksum_form_results
    before update of application_revision_status on some_schema.some_table
    for each row
    execute procedure ggircs_portal_private.checksum_form_results();
  $$;

commit;
