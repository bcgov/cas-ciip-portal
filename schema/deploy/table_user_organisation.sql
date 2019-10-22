-- Deploy ggircs-portal:table_user_organisation to pg
-- requires: schema_ggircs_portal
-- requires: table_user
-- requires: table_organisation

begin;

  create table ggircs_portal.user_organisation (
      id serial not null,
      user_id integer not null,
      organisation_id integer not null,
      primary key (id),
      foreign key (user_id) references ggircs_portal.user (id),
      foreign key (organisation_id) references ggircs_portal.organisation (id)
  );

  comment on column ggircs_portal.user_organisation.id is 'unique id of the row';
  comment on column ggircs_portal.user_organisation.user_id is 'foreign key that references the user table';
  comment on column ggircs_portal.user_organisation.organisation_id is 'foreign key that references the organisation table';

  -- insert into ggircs_portal.user_organisation (user_id, organisation_id) values (1, 1);
  -- insert into ggircs_portal.user_organisation (user_id, organisation_id) values (1, 2);

commit;

