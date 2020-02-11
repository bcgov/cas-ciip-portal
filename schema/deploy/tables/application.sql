-- Deploy ggircs-portal:table_application to pg
-- requires: schema_ggircs_portal
-- requires: table_form_result
-- requires: table_reporting_year

begin;

create table ggircs_portal.application (
    id integer primary key generated always as identity,
    facility_id integer not null references ggircs_portal.facility(id),
    reporting_year int references ggircs_portal.reporting_year(reporting_year)
);

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'application', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'application', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'application', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'application', 'ciip_analyst');
perform ggircs_portal_private.grant_permissions('update', 'application', 'ciip_analyst');

-- Grant ciip_industry_user permissions
perform ggircs_portal_private.grant_permissions('select', 'application', 'ciip_industry_user');
perform ggircs_portal_private.grant_permissions('insert', 'application', 'ciip_industry_user');

-- Grant ciip_guest permissions
-- ?
end
$grant$;

-- Enable row-level security
alter table ggircs_portal.application enable row level security;

create or replace function ggircs_portal_private.get_valid_application_facilities()
returns setof integer as
$fn$
  select f.id from ggircs_portal.facility f
    join ggircs_portal.ciip_user_organisation cuo
      on f.organisation_id = cuo.organisation_id
    join ggircs_portal.ciip_user cu
      on cuo.user_id = cu.id
      and cu.uuid = (select sub from ggircs_portal.session());
$fn$ language sql strict stable;

grant execute on function ggircs_portal_private.get_valid_application_facilities to ciip_administrator, ciip_analyst, ciip_industry_user;

do
$policy$
declare industry_user_statement text;
begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_application', 'application', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_application', 'application', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_application', 'application', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_application', 'application', 'select', 'ciip_analyst', 'true');
perform ggircs_portal_private.upsert_policy('ciip_analyst_update_application', 'application', 'update', 'ciip_analyst', 'true');

-- statement for select using & insert with check
industry_user_statement := 'facility_id in (select ggircs_portal_private.get_valid_application_facilities())' ;

-- ciip_industry_user RLS
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_application', 'application', 'select', 'ciip_industry_user', industry_user_statement);
perform ggircs_portal_private.upsert_policy('ciip_industry_user_insert_application', 'application', 'insert', 'ciip_industry_user', industry_user_statement);

end
$policy$;

comment on table ggircs_portal.application is 'The application data';
comment on column ggircs_portal.application.id is 'The application id used for reference and join';
comment on column ggircs_portal.application.facility_id is 'The foreign key to ggircs_portal.facility, references id';
comment on column ggircs_portal.application.reporting_year is 'The foreign key to ggircs_portal.reporting_year, references reporting_year';

commit;
