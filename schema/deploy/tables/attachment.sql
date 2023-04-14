-- Deploy ggircs-portal:tables/attachment to pg

begin;

create table ggircs_portal.attachment
(
  id integer primary key generated always as identity,
  file uuid,
  description varchar(10000),
  file_name varchar(1000),
  file_type varchar(100),
  file_size varchar(100),
  application_id integer not null references ggircs_portal.application(id),
  version_number int,
  foreign key (application_id, version_number) references ggircs_portal.application_revision(application_id, version_number),
  unique (application_id, version_number)
);

create index attachment_file on ggircs_portal.attachment(file);
create index application_id on ggircs_portal.attachment(application_id);
create index ggircs_portal_attachment_foreign_key on ggircs_portal.attachment(application_id, version_number);

select ggircs_portal_private.upsert_timestamp_columns(
  table_schema_name := 'ggircs_portal',
  table_name := 'attachment',
  add_create := true,
  add_update := true,
  add_delete := false);

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'attachment', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'attachment', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'attachment', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'attachment', 'ciip_analyst');

-- Grant ciip_industry_user permissions
perform ggircs_portal_private.grant_permissions('select', 'attachment', 'ciip_industry_user');
perform ggircs_portal_private.grant_permissions('insert', 'attachment', 'ciip_industry_user');
perform ggircs_portal_private.grant_permissions('update', 'attachment', 'ciip_industry_user');
perform ggircs_portal_private.grant_permissions('delete', 'attachment', 'ciip_industry_user');

-- Grant ciip_guest permissions
-- ?
end
$grant$;

-- Enable row-level security
alter table ggircs_portal.attachment enable row level security;

comment on table ggircs_portal.attachment is 'Table containing information about uploaded attachments';
comment on column ggircs_portal.attachment.id is 'Unique ID for the attachment';
comment on column ggircs_portal.attachment.file is 'Universally Unique ID for the attachment, created by the fastapi storage micro-service';
comment on column ggircs_portal.attachment.description is 'Description of the attachment';
comment on column ggircs_portal.attachment.file_name is 'Original uploaded file name';
comment on column ggircs_portal.attachment.file_type is 'Original uploaded file type';
comment on column ggircs_portal.attachment.file_size is 'Original uploaded file size';
comment on column ggircs_portal.attachment.application_id is 'The id of the application (ggircs_portal.application.id) that the attachment was uploaded to';
comment on column ggircs_portal.attachment.version_number is 'The attachment version this attachment is attached to';
comment on column ggircs_portal.attachment.created_at is 'The date the attachment was updated';
comment on column ggircs_portal.attachment.created_by is 'The person who updated the attachment';
comment on column ggircs_portal.attachment.updated_at is 'The date the attachment was updated';
comment on column ggircs_portal.attachment.updated_by is 'The person who updated the attachment';

commit;
