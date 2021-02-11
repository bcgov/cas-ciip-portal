-- Deploy ggircs-portal:computed_columns/application_operator_name to pg
-- requires: computed_columns/application_operator

begin;

create or replace function ggircs_portal.application_operator_name(app ggircs_portal.application)
  returns varchar
  as $$
    select (ggircs_portal.application_operator(app::ggircs_portal.application)).operator_name::varchar;
  $$ language sql stable;

comment on function ggircs_portal.application_operator_name(ggircs_portal.application) is E'@sortable\nThis function is a wrapper to return operator_name as a scalar from the composite return of the application_operator computed column';

commit;
