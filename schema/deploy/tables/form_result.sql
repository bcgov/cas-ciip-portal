-- Deploy ggircs-portal:table_form_result to pg
-- requires: schema_ggircs_portal
-- requires: table_form_json

begin;

create table ggircs_portal.form_result (
  id integer primary key generated always as identity,
  form_id int not null references ggircs_portal.form_json(id),
  application_id int not null references ggircs_portal.application(id),
  version_number int not null,
  form_result jsonb not null,
  created_at timestamp with time zone not null default now(),
  created_by int references ggircs_portal.ciip_user,
  updated_at timestamp with time zone not null default now(),
  updated_by int references ggircs_portal.ciip_user,
  deleted_at timestamp with time zone,
  deleted_by int references ggircs_portal.ciip_user,
  foreign key (application_id, version_number) references ggircs_portal.application_revision(application_id, version_number),
  unique (form_id, application_id, version_number)
);

create index ggircs_portal_form_result_application_revision_foreign_key on ggircs_portal.form_result(application_id, version_number);

create trigger _100_timestamps
  before insert or update on ggircs_portal.form_result
  for each row
  execute procedure ggircs_portal_private.update_timestamps();

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'form_result', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'form_result', 'ciip_analyst');

-- Grant ciip_industry_user permissions
perform ggircs_portal_private.grant_permissions('select', 'form_result', 'ciip_industry_user');
perform ggircs_portal_private.grant_permissions('insert', 'form_result', 'ciip_industry_user');
perform ggircs_portal_private.grant_permissions('update', 'form_result', 'ciip_industry_user');

-- Grant ciip_guest permissions
-- ?
end
$grant$;

-- Enable row-level security
alter table ggircs_portal.form_result enable row level security;

comment on table ggircs_portal.form_result is 'Table containing CIIP application data received from a user';
comment on column ggircs_portal.form_result.id is 'Unique ID for the form';
comment on column ggircs_portal.form_result.form_id is 'The Unique ID of the form';
comment on column ggircs_portal.form_result.application_id is 'The Unique ID of the Application';
comment on column ggircs_portal.form_result.version_number is 'The application version this form result is attached to';
comment on column ggircs_portal.form_result.form_result is 'JSON dump of form data';
comment on column ggircs_portal.form_result.created_at is 'The date the form was updated';
comment on column ggircs_portal.form_result.created_by is 'The person who updated the form';
comment on column ggircs_portal.form_result.updated_at is 'The date the form was updated';
comment on column ggircs_portal.form_result.updated_by is 'The person who updated the form';
comment on column ggircs_portal.form_result.deleted_at is 'The date the form was deleted';
comment on column ggircs_portal.form_result.deleted_by is 'The person who deleted the form';

commit;
