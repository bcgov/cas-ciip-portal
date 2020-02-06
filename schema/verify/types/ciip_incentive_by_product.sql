-- Verify ggircs-portal:types/ciip_incentive_payment on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'ciip_incentive_by_product'
    ), 'type "ciip_incentive_by_product" is not defined';
  end;
$$;


rollback;
