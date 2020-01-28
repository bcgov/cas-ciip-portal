-- Deploy ggircs-portal:table_user to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.ciip_user
(
  id integer primary key generated always as identity,
  uuid uuid not null,
  first_name varchar(1000),
  last_name varchar(1000),
  email_address varchar(1000),
  occupation varchar(1000),
  phone_number varchar(1000),
  created_at timestamp with time zone not null default now(),
  created_by int references ggircs_portal.ciip_user,
  updated_at timestamp with time zone not null default now(),
  updated_by int references ggircs_portal.ciip_user,
  deleted_at timestamp with time zone,
  deleted_by int references ggircs_portal.ciip_user

);

create trigger _100_timestamps
  before insert or update on ggircs_portal.ciip_user
  for each row
  execute procedure ggircs_portal.update_timestamps();

create unique index user_email_address_uindex
  on ggircs_portal.ciip_user(email_address);

  create unique index user_email_address_uuuid
  on ggircs_portal.ciip_user(uuid);



-- grant select, insert on ggircs_portal.ciip_user to administrator, industry_user;
-- grant update (first_name, last_name, email_address, occupation, phone_number, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by)
--   on ggircs_portal.ciip_user to administrator, industry_user;

-- -- Analyst RLS
-- grant select on ggircs_portal.ciip_user to analyst;

-- alter table ggircs_portal.ciip_user enable row level security;

-- -- Administrator RLS
-- create policy admin_select_all on ggircs_portal.ciip_user for select to administrator
--   using(true);

-- create policy admin_insert_all on ggircs_portal.ciip_user for insert to administrator
--   with check(true);

-- create policy admin_update_all_no_change_uuid on ggircs_portal.ciip_user for update to administrator
--   using(true)
--   with check(true);

-- -- Industry User RLS
-- create policy industry_user_select_own_user on ggircs_portal.ciip_user for select to industry_user
--   using (uuid=(select sub from ggircs_portal.session()));

-- create policy industry_user_insert_own_user on ggircs_portal.ciip_user for insert to industry_user
--   with check (uuid=(select sub from ggircs_portal.session()));

-- create policy industry_user_update_own_user on ggircs_portal.ciip_user for update to industry_user
--   using (uuid=(select sub from ggircs_portal.session()))
--   with check (uuid=(select sub from ggircs_portal.session()));

comment on table ggircs_portal.ciip_user is 'Table containing the benchmark and eligibility threshold for a product';
comment on column ggircs_portal.ciip_user.id is 'Unique ID for the user';
comment on column ggircs_portal.ciip_user.uuid is 'Universally Unique ID for the user used for auth';
comment on column ggircs_portal.ciip_user.first_name is 'User''s first name';
comment on column ggircs_portal.ciip_user.last_name is 'User''s last name';
comment on column ggircs_portal.ciip_user.email_address is 'User''s email address';
comment on column ggircs_portal.ciip_user.occupation is 'User''s occupation';
comment on column ggircs_portal.ciip_user.phone_number is 'User''s phone number';
comment on column ggircs_portal.ciip_user.created_at is 'The date the user was updated';
comment on column ggircs_portal.ciip_user.created_by is 'The person who updated the user';
comment on column ggircs_portal.ciip_user.updated_at is 'The date the user was updated';
comment on column ggircs_portal.ciip_user.updated_by is 'The person who updated the user';
comment on column ggircs_portal.ciip_user.deleted_at is 'The date the user was deleted';
comment on column ggircs_portal.ciip_user.deleted_by is 'The person who deleted the user';

commit;
