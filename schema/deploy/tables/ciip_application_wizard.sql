-- Deploy ggircs-portal:table_ciip_application_wizard to pg
-- requires: table_form_json

begin;

create table ggircs_portal.ciip_application_wizard (
  form_id integer not null primary key references ggircs_portal.form_json(id),
  form_position integer not null
);
-- TODO(wenzowski): trigger to ensure consistency of form_position column

create unique index ciip_application_wizard_form_id_uindex on ggircs_portal.ciip_application_wizard(form_id);
create unique index ciip_application_wizard_form_position_uindex on ggircs_portal.ciip_application_wizard(form_position);

grant all on table ggircs_portal.ciip_application_wizard to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

comment on table ggircs_portal.ciip_application_wizard is 'A table defining which forms are in the application wizard and their order';
comment on column ggircs_portal.ciip_application_wizard.form_id is 'The id of the form';
comment on column ggircs_portal.ciip_application_wizard.form_position is 'The zero-indexed position of the form in the wizard';

commit;
