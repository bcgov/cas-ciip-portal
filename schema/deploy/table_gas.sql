-- Deploy ggircs-portal:gas to pg
-- requires: schema_ggircs_portal

BEGIN;

create table ggircs_portal.gas (
  id integer primary key generated always as identity,
  gas_type varchar(1000),
  gas_description varchar(10000),
  gwp numeric,
  created_at timestamp with time zone not null default now(),
  created_by varchar(1000),
  updated_at timestamp with time zone not null default now(),
  updated_by varchar(1000),
  deleted_at timestamp with time zone,
  deleted_by varchar(1000)
);

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
