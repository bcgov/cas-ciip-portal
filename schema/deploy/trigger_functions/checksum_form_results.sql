-- Deploy ggircs-portal:trigger_functions/checksum_form_results to pg
-- requires: tables/form_result

begin;

create or replace function ggircs_portal.checksum_form_results()
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

      if new_form_result_hash != old_form_result_hash then
      raise notice 'Form Result: % changed from previous version', (select name from ggircs_portal.form_json where id = temp_row.form_id);
        update ggircs_portal.form_result_status frs set form_result_status = 'needs attention'
        where frs.application_id = new.application_id
        and frs.form_id = temp_row.form_id;
      end if;



    end loop;
  end if;

  return new;
end;
$$ language plpgsql;

-- comment on function ggircs_portal.set_expiry()
--   is $$
--   a trigger to set expires_at column.
--   example usage:

--   create table some_schema.some_table (
--     ...
--     expires_at timestamp with time zone not null
--   );
--   create trigger _set_expiry
--     before insert on some_schema.some_table
--     for each row
--     execute procedure ggircs_portal.set_expiry('7 days');
--   $$;

commit;
