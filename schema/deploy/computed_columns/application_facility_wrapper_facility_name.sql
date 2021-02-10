-- Deploy ggircs-portal:computed_columns/application_facility_wrapper_facility_name to pg
-- requires: computed_columns/application_facility

begin;

-- wrapper. Note the () for notation. Failing to use them will throw an error
create or replace function ggircs_portal.application_facility_wrapper_facility_name(app ggircs_portal.application)
  returns varchar
  as $$
    select (ggircs_portal.application_facility(app::ggircs_portal.application)).facility_name::varchar;
  $$ language sql stable;

comment on function ggircs_portal.application_facility_wrapper_facility_name(ggircs_portal.application) is E'@sortable\nThis function is a wrapper to return facility_name as a scalar';

commit;
