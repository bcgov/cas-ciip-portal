-- Deploy ggircs-portal:table_application to pg
-- requires: schema_ggircs_portal
-- requires: table_application_revision
-- requires: type_ciip_application_revision_status

begin;

create table ggircs_portal.application_revision_status (
    id integer primary key generated always as identity,
    application_id int not null,
    version_number int not null,
    application_revision_status ggircs_portal.ciip_application_revision_status,
    created_at timestamp with time zone not null default now(),
    created_by int references ggircs_portal.ciip_user,
    updated_at timestamp with time zone not null default now(),
    updated_by int references ggircs_portal.ciip_user,
    deleted_at timestamp with time zone,
    deleted_by int references ggircs_portal.ciip_user,
    foreign key (application_id, version_number) references ggircs_portal.application_revision(application_id, version_number)
);

create index ggircs_portal_application_revision_status_foreign_key on ggircs_portal.application_revision_status(application_id, version_number);

create trigger _ensure_window_open
  before insert or update on ggircs_portal.application_revision_status
  for each row
  execute procedure ggircs_portal.ensure_window_open_submit_application_status();

create trigger _100_timestamps
  before insert or update on ggircs_portal.application_revision_status
  for each row
  execute procedure ggircs_portal.update_timestamps();

create trigger _checksum_form_results
    before insert or update of application_revision_status on ggircs_portal.application_revision_status
    for each row
    execute procedure ggircs_portal.checksum_form_results();

comment on table ggircs_portal.application_revision_status is 'The application revision status data';
comment on column ggircs_portal.application_revision_status.id is 'The id used for reference and join';
comment on column ggircs_portal.application_revision_status.application_id is 'The foreign key to application used for reference and join';
comment on column ggircs_portal.application_revision_status.version_number is 'The application version this status is attached to';
comment on column ggircs_portal.application_revision_status.application_revision_status is 'The application revision status';
comment on column ggircs_portal.application_revision_status.created_at is 'The date the application revision status was updated';
comment on column ggircs_portal.application_revision_status.created_by is 'The person who updated the application revision status';
comment on column ggircs_portal.application_revision_status.updated_at is 'The date the application revision status was updated';
comment on column ggircs_portal.application_revision_status.updated_by is 'The person who updated the application revision status';
comment on column ggircs_portal.application_revision_status.deleted_at is 'The date the application revision status was deleted';
comment on column ggircs_portal.application_revision_status.deleted_by is 'The person who deleted the application revision status';

commit;
