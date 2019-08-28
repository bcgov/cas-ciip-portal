-- Deploy ggircs-portal:table_user to pg
-- requires: schema_ggircs_portal

BEGIN;

create table ggircs_portal.user
(
	id int not null,
	first_name varchar(1000),
	last_name varchar(1000),
	email_address varchar(1000)
);

comment on column ggircs_portal.user.id is 'Unique ID for the user';

comment on column ggircs_portal.user.first_name is 'User''s first name';

comment on column ggircs_portal.user.last_name is 'User''s last name';

comment on column ggircs_portal.user.email_address is 'User''s email address';

create unique index user_email_address_uindex
	on ggircs_portal.user (email_address);

create unique index user_id_uindex
	on ggircs_portal.user (id);

alter table ggircs_portal.user
	add constraint user_pk
		primary key (id);

insert into ggircs_portal.user (id, first_name, last_name, email_address) values (1, 'Hamza', 'Javed', 'hamza@button.is');
insert into ggircs_portal.user (id, first_name, last_name, email_address) values (2, 'Alec', 'Wenzowski', 'alec@button.is');
insert into ggircs_portal.user (id, first_name, last_name, email_address) values (3, 'Kawhi', 'Leonard', 'kawhi@button.is');

COMMIT;
