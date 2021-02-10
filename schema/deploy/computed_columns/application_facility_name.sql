-- Deploy ggircs-portal:computed_columns/application_facility_name to pg
-- requires: computed_columns/application_facility

begin;

create or replace function ggircs_portal.application_facility_name(app ggircs_portal.application)
  returns varchar
  as $$
    select (ggircs_portal.application_facility(app::ggircs_portal.application)).facility_name::varchar;
  $$ language sql stable;

comment on function ggircs_portal.application_facility_name(ggircs_portal.application) is E'@sortable\nThis function is a wrapper to return facility_name as a scalar from the composite return of the application_facility computed column';

commit;
