-- Deploy ggircs-portal:table_emission_category to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.emission_category (
  id integer primary key generated always as identity,
  swrs_emission_category varchar(1000),
  display_name varchar(1000),
  created_at timestamp with time zone not null default now(),
  created_by int references ggircs_portal.ciip_user,
  updated_at timestamp with time zone not null default now(),
  updated_by int references ggircs_portal.ciip_user,
  deleted_at timestamp with time zone,
  deleted_by int references ggircs_portal.ciip_user
);

create trigger _100_timestamps
  before insert or update on ggircs_portal.emission_category
  for each row
  execute procedure ggircs_portal_private.update_timestamps();

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'emission_category', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'emission_category', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'emission_category', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'emission_category', 'ciip_analyst');

-- Grant ciip_industry_user permissions
perform ggircs_portal_private.grant_permissions('select', 'emission_category', 'ciip_industry_user');

-- Grant ciip_guest permissions
-- ?
end
$grant$;

-- Enable row-level security
alter table ggircs_portal.emission_category enable row level security;

comment on table ggircs_portal.emission_category is 'Table of emission categories used in the CIIP program';
comment on column ggircs_portal.emission_category.id is 'Unique ID for the emission_category';
comment on column ggircs_portal.emission_category.swrs_emission_category is 'The original name in the swrs data';
comment on column ggircs_portal.emission_category.display_name is 'The name displayed in the CIIP portal UI';
comment on column ggircs_portal.emission_category.created_at is 'Creation date of row';
comment on column ggircs_portal.emission_category.created_by is 'Creator of row';
comment on column ggircs_portal.emission_category.updated_at is 'Updated date of row';
comment on column ggircs_portal.emission_category.updated_by is 'Updator of row';
comment on column ggircs_portal.emission_category.deleted_at is 'Date of deletion';
comment on column ggircs_portal.emission_category.deleted_by is 'The user who deleted the row';

commit;
