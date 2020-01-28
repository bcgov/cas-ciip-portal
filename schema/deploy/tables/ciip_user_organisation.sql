-- Deploy ggircs-portal:table_user_organisation to pg
-- requires: schema_ggircs_portal
-- requires: table_user
-- requires: table_organisation
-- requires: type_user_organisation_status

begin;

  create table ggircs_portal.ciip_user_organisation (
      id integer primary key generated always as identity,
      user_id integer not null references ggircs_portal.ciip_user (id),
      organisation_id integer not null references ggircs_portal.organisation (id),
      status ggircs_portal.ciip_user_organisation_status
  );

  create trigger _set_user_id
    before insert on ggircs_portal.ciip_user_organisation
    for each row
    execute procedure ggircs_portal.set_user_id();

  create unique index user_organisation_user_id_organisation_id_uindex on ggircs_portal.ciip_user_organisation(user_id, organisation_id);

  grant select, insert on ggircs_portal.ciip_user to administrator;

  grant select on ggircs_portal.ciip_user to analyst;



  comment on table ggircs_portal.ciip_user_organisation is 'Table containing the access rights for a user to report on behalf of an organisation';
  comment on column ggircs_portal.ciip_user_organisation.id is 'ciip_user_organisation primary key';
  comment on column ggircs_portal.ciip_user_organisation.user_id is 'foreign key that references the user table';
  comment on column ggircs_portal.ciip_user_organisation.organisation_id is 'foreign key that references the organisation table';
  comment on column ggircs_portal.ciip_user_organisation.status is 'the status of the request to report on behalf of an organisation';

commit;
