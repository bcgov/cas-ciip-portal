-- Deploy ggircs-portal:computed_columns/application_facility_name to pg
-- requires: tables/application

begin;

create or replace function ggircs_portal.application_facility_name(app ggircs_portal.application)
  returns varchar
  as $$
    select facility_name::varchar from ggircs_portal.facility where facility.id = app.facility_id;
  $$ language sql stable;

comment on function ggircs_portal.application_facility_name(ggircs_portal.application) is E'@sortable\nThis function is a wrapper to return facility_name from the facility object';

commit;
