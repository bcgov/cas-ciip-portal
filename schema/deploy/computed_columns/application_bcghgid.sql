-- Deploy ggircs-portal:computed_columns/application_facility_bcghgid to pg
-- requires: computed_columns/application_facility

begin;

create or replace function ggircs_portal.application_bcghgid(app ggircs_portal.application)
  returns varchar
  as $$
    select bcghgid::varchar from ggircs_portal.facility where facility.id = app.facility_id;
  $$ language sql stable;

comment on function ggircs_portal.application_bcghgid(ggircs_portal.application) is E'@sortable\nThis function is a wrapper to return bcghgid as a scalar from the composite return of the application_facility computed column';

commit;
