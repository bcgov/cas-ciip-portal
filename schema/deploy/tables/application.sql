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

comment on table ggircs_portal.application is 'The application data';
comment on column ggircs_portal.application.id is 'The application id used for reference and join';
comment on column ggircs_portal.application.facility_id is 'The foreign key to ggircs_portal.facility, references id';
comment on column ggircs_portal.application.reporting_year is 'The foreign key to ggircs_portal.reporting_year, references reporting_year';

commit;
