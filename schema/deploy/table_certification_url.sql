-- Deploy ggircs-portal:table_certification_url to pg
-- requires: table_application

begin;

create table ggircs_portal.certification_url (
  id varchar(1000) primary key,
  application_id int not null references ggircs_portal.application(id),
  created_at timestamp with time zone not null default now(),
  created_by varchar(1000),
  updated_at timestamp with time zone not null default now(),
  updated_by varchar(1000),
  deleted_at timestamp with time zone,
  deleted_by int references ggircs_portal.ciip_user
);

create trigger _100_timestamps
  before insert or update on ggircs_portal.certification_url
  for each row
  execute procedure ggircs_portal.update_timestamps();

comment on table ggircs_portal.certification_url is 'Table containing the certification_url for an application';
comment on column ggircs_portal.certification_url.id is 'Unique ID for the certification_url';
comment on column ggircs_portal.certification_url.application_id is 'Foreign key to the application';
comment on column ggircs_portal.certification_url.created_at is 'Creation date of row';
comment on column ggircs_portal.certification_url.created_by is 'Creator of row';
comment on column ggircs_portal.certification_url.updated_at is 'Last update date of row';
comment on column ggircs_portal.certification_url.updated_by is 'The user who last updated the row';
comment on column ggircs_portal.certification_url.deleted_at is 'Deletion date of row';
comment on column ggircs_portal.certification_url.deleted_by is 'The user who deleted the row';

commit;
