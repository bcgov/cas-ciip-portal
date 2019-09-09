-- Deploy ggircs-portal:function_get_products_by_bcghgid to pg

BEGIN;


create or replace function ggircs_portal.get_products_by_bcghgid(bcghgid_input text)
  returns setof ggircs_portal.ciip_production as $function$

    select *
    from ggircs_portal.ciip_production
    where bcghgid = bcghgid_input::numeric

  $function$ language sql stable;


COMMIT;


