-- Deploy ggircs-portal:view_ciip_production to pg
-- requires: table_form_result

begin;
  create view ggircs_portal.ciip_production as (
    with x as (
      select * from
      (select
         form_result.application_id as id,
         json_array_elements((form_result)::json) as production_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.name = 'Production') as A
      inner join
      (select
         form_result.application_id as fid,
         (form_result -> 'facility')::json as facility_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.name = 'Admin') as B
      on A.id = B.fid
    )
    select
       x.id,
       (x.facility_data ->> 'bcghgid')::numeric as bcghgid,
       (x.production_data ->> 'quantity')::numeric as quantity,
       (x.production_data ->> 'product')::varchar(1000) as product,
       (x.production_data ->> 'productUnits')::varchar(1000) as fuel_units,
       (x.production_data ->> 'comments')::varchar(10000) as comments,
       (x.production_data ->> 'associatedEmissions')::numeric as associated_emissions
    from x
 );

-- Postgraphile smart-comments: These comments allow Postgraphile to infer relations between views
-- as though they were tables (ie faking a primary key in order to create an ID! type)
comment on view ggircs_portal.ciip_production is E'@primaryKey id';

-- TODO(Dylan): Regular comments are interfering with postgraphile smart comments.
-- comment on view ggircs_portal.ciip_production is 'The view for production data reported in the application';
-- comment on column ggircs_portal.ciip_production.application_id is 'The application id used for reference and join';
-- comment on column ggircs_portal.ciip_production.quantity is 'The production quantity';
-- comment on column ggircs_portal.ciip_production.product is 'The actual equipment';
-- comment on column ggircs_portal.ciip_production.fuel_units is 'The emission/fuel units for the production unit';
-- comment on column ggircs_portal.ciip_production.comments is 'The comments';
-- comment on column ggircs_portal.ciip_production.associated_emissions is 'The methodology details if other';

commit;
