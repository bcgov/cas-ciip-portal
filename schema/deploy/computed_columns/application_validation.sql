-- Deploy ggircs-portal:computed_columns/application_validation to pg
-- requires: types/application_validation_result
-- requires: tables/application_validation_function

begin;

create or replace function ggircs_portal.application_validation(app ggircs_portal.application)
returns setof ggircs_portal.application_validation_result
as $function$
declare
  temp_row record;
  execute_string text;
  result boolean;
  return_result record;
begin

  for temp_row in
    select * from ggircs_portal.application_validation_function
  loop

      execute_string := format('select ggircs_portal.%I($1);', temp_row.validation_function_name);
      execute execute_string
        using app.id
        into result;

      return query select temp_row.validation_description, temp_row.validation_failed_message, result as is_ok;

  end loop;

end;

$function$ language plpgsql strict stable;

grant execute on function ggircs_portal.application_validation to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;