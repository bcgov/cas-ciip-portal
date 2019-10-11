-- Deploy ggircs-portal:table_user to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.user
(
  id int not null,
  uuid uuid
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

comment on column ggircs_portal.user.id is 'Unique ID for the user';
comment on column ggircs_portal.user.uuid is 'Universally Unique ID for the user used for auth';
comment on column ggircs_portal.user.first_name is 'User''s first name';
comment on column ggircs_portal.user.last_name is 'User''s last name';
comment on column ggircs_portal.user.email_address is 'User''s email address';
comment on column ggircs_portal.user.created_at is 'The date the user was updated';
comment on column ggircs_portal.user.created_by is 'The person who updated the user';
comment on column ggircs_portal.user.updated_at is 'The date the user was updated';
comment on column ggircs_portal.user.updated_by is 'The person who updated the user';

insert into ggircs_portal.user (id, first_name, last_name, email_address)
        values (1, '6c01258f-6ad8-4790-8ccc-485163f122a5' , 'Hamza', 'Javed', 'hamza@button.is');
insert into ggircs_portal.user (id, first_name, last_name, email_address)
        values (2, 'ca716545-a8d3-4034-819c-5e45b0e775c9' , 'Alec', 'Wenzowski', 'alec@button.is');
insert into ggircs_portal.user (id, first_name, last_name, email_address)
        values (3, '11bc5fb8-88f6-4b6e-92e3-581622ad4804',. 'Kawhi', 'Leonard', 'kawhi@button.is');

commit;
