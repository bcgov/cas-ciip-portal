-- Deploy ggircs-portal:computed_columns/application_facility to pg
-- requires: tables/application

begin;

create or replace function ggircs_portal.application_facility(app ggircs_portal.application)
returns setof ggircs_portal.facility
as $$
  begin

    return query (
      select * from ggircs_portal.facility where facility.id = app.facility_id
    );

  end;
$$ language 'plpgsql' stable;

commit;
