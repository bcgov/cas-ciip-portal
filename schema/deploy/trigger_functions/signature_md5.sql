-- Deploy ggircs-portal:trigger_functions/signature_md5 to pg
-- requires: schema_ggircs_portal_private

begin;
  create or replace function ggircs_portal_private.signature_md5()
    returns trigger as $$

  declare
    all_form_results text;
    form_result_hash text;
    temp_row record;

  begin
    -- Get current hash of all form results for application_revision
    for temp_row in
        select form_id from ggircs_portal.ciip_application_wizard
      loop

        all_form_results = (select concat(
                                    all_form_results,
                                    (select form_result::text
                                    from ggircs_portal.form_result fr
                                    where fr.application_id = new.application_id
                                    and fr.form_id = temp_row.form_id
                                    and fr.version_number = new.version_number)
                                  ));
      end loop;

    if (tg_op = 'INSERT') then
      new.form_results_md5 = (select md5(all_form_results));
    elsif (tg_op = 'UPDATE') then
      form_result_hash = (select md5(all_form_results));
      if (new.form_results_md5 != form_result_hash) then
        raise notice 'CURRENT HASH: %, CERTIFICATION_URL HASH: %', form_result_hash, new.form_results_md5;
        raise exception 'current hash of form results for application % version % does not match the hash in the certification_url table', new.application_id, new.version_number;
      end if;
    end if;

    return new;
  end;
  $$ language plpgsql volatile;

commit;
