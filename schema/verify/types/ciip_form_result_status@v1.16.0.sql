-- Verify ggircs-portal:types/ciip_form_result_status on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'ciip_form_result_status'
    ), 'type "ciip_form_result_status" is not defined';
  end;
$$;

rollback;
