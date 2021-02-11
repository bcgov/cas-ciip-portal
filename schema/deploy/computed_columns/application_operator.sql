-- Deploy ggircs-portal:computed_columns/application_operator to pg
-- requires: tables/application

begin;

create or replace function ggircs_portal.application_operator(app ggircs_portal.application)
returns setof ggircs_portal.facility
as $$
  begin

    return query (
      select o.* from ggircs_portal.organisation o
        join ggircs_portal.facility f on o.id = f.organisation_id
        join ggircs_portal.application on f.id = app.facility_id
    );

  end;
$$ language 'plpgsql' stable;

comment on function ggircs_portal.application_operator is 'Computed column returns an operator object that is the parent of the application passed in via parameter';

commit;
