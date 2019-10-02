-- Deploy ggircs-portal:table_user_details to pg
-- requires: table_user

BEGIN;

create table ggircs_portal.user_details(
    id int,
    user_id int,
    role varchar(1000),
    phone varchar(11),
    email varchar(100)
);

alter table ggircs_portal.user_details
    add constraint user_details_pk
        primary key (id),
    add constraint user_details_fk
        foreign key (user_id)
        references ggircs_portal.user(id)
        on delete cascade;

insert into ggircs_portal.user_details (id, user_id, role, phone, email) values (0, 1, 'frontend developer', '6042999395', 'hamza@button.is');
insert into ggircs_portal.user_details (id, user_id, role, phone, email) values (1, 2, 'fullstack developer', '6478909093', 'alec@button.is');
insert into ggircs_portal.user_details (id, user_id, role, phone, email) values (2, 3, 'the help', '7788988189', 'kawhi@button.is');

COMMIT;
