-- Deploy ggircs-portal:table_organisation_facility to pg
-- requires: schema_ggircs_portal
-- requires: table_organisation
-- requires: table_facility


begin;

  create table ggircs_portal.organisation_facility (
      id integer not null,
      organisation_id integer not null,
      facility_id integer not null,
      primary key (id),
      foreign key (organisation_id) references ggircs_portal.organisation (id),
      foreign key (facility_id) references ggircs_portal.facility (id)
  );

  comment on column ggircs_portal.organisation_facility.id is 'unique id of the row';
  comment on column ggircs_portal.organisation_facility.facility_id is 'foreign key that references the facility table';
  comment on column ggircs_portal.organisation_facility.organisation_id is 'foreign key that references the organisation table';

  insert into ggircs_portal.organisation_facility (id, organisation_id, facility_id) values (1, 1, 1);
  insert into ggircs_portal.organisation_facility (id, organisation_id, facility_id) values (2, 1, 2);
  insert into ggircs_portal.organisation_facility (id, organisation_id, facility_id) values (3, 2, 3);


commit;
