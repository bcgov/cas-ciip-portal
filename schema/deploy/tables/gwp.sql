-- Deploy ggircs-portal:tables/gwp to pg
-- requires: tables/gas_001

begin;

create table ggircs_portal.gwp (
  id integer primary key generated always as identity,
  gas_id integer references ggircs_portal.gas
  gwp numeric not null,
  description varchar(10000),
  reporting_year_start integer not null,
  reporting_year_end integer not null,
  created_at timestamp with time zone not null default now(),
  created_by int references ggircs_portal.ciip_user,
  updated_at timestamp with time zone not null default now(),
  updated_by int references ggircs_portal.ciip_user,
  deleted_at timestamp with time zone,
  deleted_by int references ggircs_portal.ciip_user
);

create trigger _100_timestamps
  before insert or update on ggircs_portal.gwp
  for each row
  execute procedure ggircs_portal_private.update_timestamps();

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'gwp', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'gwp', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'gwp', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'gwp', 'ciip_analyst');

-- Grant ciip_industry_user permissions
perform ggircs_portal_private.grant_permissions('select', 'gwp', 'ciip_industry_user');

end
$grant$;

-- No further row-level security policies necessary beyond grants

comment on table ggircs_portal.gwp is 'Table of legislated GWP values used in the CIIP program';
comment on column ggircs_portal.gwp.id is 'Primary key for the gwp table';
comment on column ggircs_portal.gwp.gas_id is 'Foreign key to the gas table';
comment on column ggircs_portal.gwp.gwp is 'Global warming potential of the gwp';
comment on column ggircs_portal.gwp.reporting_year_start is 'The first reporting year that this GWP value came into effect';
comment on column ggircs_portal.gwp.description is 'The last reporting year that this GWP value was in effect';
comment on column ggircs_portal.gwp.created_at is 'Creation date of row';
comment on column ggircs_portal.gwp.created_by is 'Creator of row';
comment on column ggircs_portal.gwp.updated_at is 'Updated date of row';
comment on column ggircs_portal.gwp.updated_by is 'Updator of row';
comment on column ggircs_portal.gwp.deleted_at is 'Date of deletion';
comment on column ggircs_portal.gwp.deleted_by is 'The user who deleted the row';

commit;
