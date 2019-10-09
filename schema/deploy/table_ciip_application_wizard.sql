-- Deploy ggircs-portal:table_ciip_application_wizard to pg
-- requires: table_form_json

begin;

create table ggircs_portal.ciip_application_wizard (
  form_id integer not null primary key references ggircs_portal.form_json(id),
  form_position integer not null,
  prepopulate_from_ciip boolean not null,
  prepopulate_from_swrs boolean not null
);

create unique index ciip_application_wizard_form_id_uindex on ggircs_portal.ciip_application_wizard(form_id);
create unique index ciip_application_wizard_form_position_uindex on ggircs_portal.ciip_application_wizard(form_position);

comment on table ggircs_portal.ciip_application_wizard is 'A table defining which forms are in the application wizard and their order';
comment on column ggircs_portal.ciip_application_wizard.form_id is 'The id of the form';
comment on column ggircs_portal.ciip_application_wizard.form_position is 'The zero-indexed position of the form in the wizard';
comment on column ggircs_portal.ciip_application_wizard.prepopulate_from_ciip is 'Whether the form is initialized with data submitted in the previous year''s application';
comment on column ggircs_portal.ciip_application_wizard.prepopulate_from_swrs is 'Whether the form is initialized with data submitted in the previous year''s application';

insert into ggircs_portal.ciip_application_wizard
  (form_id, form_position, prepopulate_from_ciip, prepopulate_from_swrs)
values
  (1, 0, true, true),
  (2, 1, false, true),
  (3, 2, false, true),
  (4, 3, false, false),
  (5, 4, false, false),
  (6, 5, false, false);

commit;
