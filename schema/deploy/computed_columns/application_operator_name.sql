-- Deploy ggircs-portal:computed_columns/application_operator_name to pg
-- requires: tables/application

begin;

create or replace function ggircs_portal.application_operator_name(app ggircs_portal.application)
  returns varchar
  as $$
    select o.operator_name::varchar from ggircs_portal.organisation o
      join ggircs_portal.facility f on o.id = f.organisation_id
      join ggircs_portal.application on app.facility_id = f.id;
  $$ language sql stable;

comment on function ggircs_portal.application_operator_name(ggircs_portal.application) is E'@sortable\nThis function is a wrapper to return operator_name from the organisation object';

commit;
