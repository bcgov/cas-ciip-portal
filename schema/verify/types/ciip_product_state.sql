-- Verify ggircs-portal:types/ciip_product_state on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'ciip_product_state'
    ), 'type "ciip_product_state" is not defined';
  end;
$$;

rollback;
