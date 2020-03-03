-- Deploy ggircs-portal:function_current_form_result_md5 to pg
-- requires: tables/form_result

begin;
  create or replace function ggircs_portal_private.current_form_results_md5(application_id_input int, version_number_input int)
    returns bytea as
    $function$
      declare
        all_form_results text;
        form_result_hash bytea;
        temp_row record;
      begin

        -- Get concactenated string of all form results for application_revision
        for temp_row in
            select form_id from ggircs_portal.ciip_application_wizard
          loop
            all_form_results = (select concat(
                                        all_form_results,
                                        (select form_result::text
                                        from ggircs_portal.form_result fr
                                        where fr.application_id = application_id_input
                                        and fr.form_id = temp_row.form_id
                                        and fr.version_number = version_number_input)
                                      ));
          end loop;
        -- Return the md5 hash of all form results in bytea format
        return (select md5(all_form_results)::bytea);
      end;
    $function$ language plpgsql stable;

  grant execute on function ggircs_portal.current_timestamp to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

commit;

comment on function ggircs_portal.current_timestamp is 'Calculates the md5 hash in bytea format of the concactenated form results for an application revision';
