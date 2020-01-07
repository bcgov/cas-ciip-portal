-- Deploy ggircs-portal:function_current_date to pg
-- requires: schema_ggircs_portal

begin;

create function ggircs_portal.current_date() returns date as
$$
  begin
  return current_date;
  end;
$$ language 'plpgsql';

commit;

comment on function ggircs_portal.current_date is 'Returns the current date.
This should be used instead of the native current_date function to allow for mocking in test and development settings';
