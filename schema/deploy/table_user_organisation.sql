-- Deploy ggircs-portal:table_user_organisation to pg
-- requires: schema_ggircs_portal
-- requires: table_user
-- requires: table_organisation

begin;

  create table ggircs_portal.user_organisation (
      user_id integer not null,
      organisation_id integer not null,
      status varchar(1000) not null,
      primary key (user_id, organisation_id),
      foreign key (user_id) references ggircs_portal.user (id),
      foreign key (organisation_id) references ggircs_portal.organisation (id)
  );

  create unique index user_organisation_user_id_organisation_id_uindex on ggircs_portal.user_organisation(user_id, organisation_id);

  comment on column ggircs_portal.user_organisation.user_id is 'foreign key that references the user table';
  comment on column ggircs_portal.user_organisation.organisation_id is 'foreign key that references the organisation table';
  comment on column ggircs_portal.user_organisation.status is 'the status of user access to the organisation';

commit;
