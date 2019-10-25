-- Deploy ggircs-portal:table_user to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.user
(
  id int not null,
  uuid uuid,
  first_name varchar(1000),
  last_name varchar(1000),
  email_address varchar(1000),
  created_at timestamp with time zone not null default now(),
  created_by varchar(1000),
  updated_at timestamp with time zone not null default now(),
  updated_by varchar(1000)

);

create trigger _100_timestamps
  before insert or update on ggircs_portal.user
  for each row
  execute procedure ggircs_portal.update_timestamps();

create unique index user_email_address_uindex
  on ggircs_portal.user (email_address);

create unique index user_id_uindex
  on ggircs_portal.user (id);

alter table ggircs_portal.user
  add constraint user_pk
    primary key (id);
alter table ggircs_portal.user
  add column occupation varchar(1000),
  add column phone_number varchar(1000);

comment on column ggircs_portal.user.id is 'Unique ID for the user';
comment on column ggircs_portal.user.uuid is 'Universally Unique ID for the user used for auth';
comment on column ggircs_portal.user.first_name is 'User''s first name';
comment on column ggircs_portal.user.last_name is 'User''s last name';
comment on column ggircs_portal.user.email_address is 'User''s email address';
comment on column ggircs_portal.user.created_at is 'The date the user was updated';
comment on column ggircs_portal.user.created_by is 'The person who updated the user';
comment on column ggircs_portal.user.updated_at is 'The date the user was updated';
comment on column ggircs_portal.user.updated_by is 'The person who updated the user';

commit;
