-- Deploy ggircs-portal:table_application_revision to pg
-- requires: table_application

begin;

create table ggircs_portal.application_revision (
    application_id int not null references ggircs_portal.application(id),
    version_number int not null,
    created_at timestamp with time zone not null default now(),
    created_by varchar(1000),
    updated_at timestamp with time zone not null default now(),
    updated_by varchar(1000),
    deleted_at timestamp with time zone,
    deleted_by int references ggircs_portal.ciip_user,
    primary key (application_id, version_number)
);

create unique index ggircs_portal_application_revision_primary_key on ggircs_portal.application_revision (application_id, version_number);
create index ggircs_portal_application_revision_application_foreign_key on ggircs_portal.application_revision(application_id);

create trigger _100_timestamps
  before insert or update on ggircs_portal.application_revision
  for each row
  execute procedure ggircs_portal.update_timestamps();

comment on table ggircs_portal.application_revision is 'The application revision data';

comment on column ggircs_portal.application_revision.application_id is 'The foreign key to the ciip application, also part of the composite primary key with version number';
comment on column ggircs_portal.application_revision.version_number is 'The version number of the revision, also part of the composite primary key with application_id';
comment on column ggircs_portal.application_revision.created_at is 'The date the application revision status was updated';
comment on column ggircs_portal.application_revision.created_by is 'The person who updated the application revision status';
comment on column ggircs_portal.application_revision.updated_at is 'The date the application revision status was updated';
comment on column ggircs_portal.application_revision.updated_by is 'The person who updated the application revision status';
comment on column ggircs_portal.application_revision.deleted_at is 'The date the application revision status was deleted';
comment on column ggircs_portal.application_revision.deleted_by is 'The person who deleted the application revision status';

commit;
