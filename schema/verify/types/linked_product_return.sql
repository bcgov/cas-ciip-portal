-- Verify ggircs-portal:types/linked_product_return on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'linked_product_return'
    ), 'type "linked_product_return" is not defined';
  end;
$$;

rollback;
