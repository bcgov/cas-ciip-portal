-- Deploy ggircs-portal:gas to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.gas (
  id integer primary key generated always as identity,
  gas_type varchar(1000),
  gas_description varchar(10000),
  gwp numeric,
  created_at timestamp with time zone not null default now(),
  created_by int references ggircs_portal.ciip_user,
  updated_at timestamp with time zone not null default now(),
  updated_by int references ggircs_portal.ciip_user,
  deleted_at timestamp with time zone,
  deleted_by int references ggircs_portal.ciip_user
);

create trigger _100_timestamps
  before insert or update on ggircs_portal.gas
  for each row
  execute procedure ggircs_portal_private.update_timestamps();

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'gas', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'gas', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'gas', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'gas', 'ciip_analyst');

-- Grant ciip_industry_user permissions
perform ggircs_portal_private.grant_permissions('select', 'gas', 'ciip_industry_user');

-- Grant ciip_guest permissions
-- ?
end
$grant$;

-- Enable row-level security
alter table ggircs_portal.gas enable row level security;

comment on table ggircs_portal.gas is 'Table of gases used in the CIIP program';
comment on column ggircs_portal.gas.id is 'Unique ID for the gas';
comment on column ggircs_portal.gas.gas_type is 'The name of the gas';
comment on column ggircs_portal.gas.gas_description is 'Describe the gas and its use';
comment on column ggircs_portal.gas.gwp is 'Global warming potential of the gas';
comment on column ggircs_portal.gas.created_at is 'Creation date of row';
comment on column ggircs_portal.gas.created_by is 'Creator of row';
comment on column ggircs_portal.gas.updated_at is 'Updated date of row';
comment on column ggircs_portal.gas.updated_by is 'Updator of row';
comment on column ggircs_portal.gas.deleted_at is 'Date of deletion';
comment on column ggircs_portal.gas.deleted_by is 'The user who deleted the row';


commit;
