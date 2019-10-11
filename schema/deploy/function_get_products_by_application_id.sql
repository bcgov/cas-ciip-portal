-- Deploy ggircs-portal:function_get_products_by_application_id to pg
-- requires: schema_ggircs_portal
-- requires: view_ciip_production

begin;

create or replace function ggircs_portal.get_products_by_application_id(app_id text)
  returns setof ggircs_portal.ciip_production as $function$

    select *
    from ggircs_portal.ciip_production
    where id::text = app_id

  $function$ language sql stable;

commit;
