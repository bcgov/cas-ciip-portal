-- Deploy ggircs-portal:table_ciip_application_wizard to pg
-- requires: table_form_json

begin;

create table ggircs_portal.ciip_application_wizard (
  form_id integer not null primary key references ggircs_portal.form_json(id),
  form_position integer not null
);

create unique index ciip_application_wizard_form_id_uindex on ggircs_portal.ciip_application_wizard(form_id);
create unique index ciip_application_wizard_form_position_uindex on ggircs_portal.ciip_application_wizard(form_position);

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'ciip_application_wizard', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'ciip_application_wizard', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'ciip_application_wizard', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'ciip_application_wizard', 'ciip_analyst');

-- Grant ciip_industry_user permissions
perform ggircs_portal_private.grant_permissions('select', 'ciip_application_wizard', 'ciip_industry_user');

-- Grant ciip_guest permissions
-- ?
end
$grant$;

-- Enable row-level security
alter table ggircs_portal.ciip_application_wizard enable row level security;

comment on table ggircs_portal.ciip_application_wizard is 'A table defining which forms are in the application wizard and their order';
comment on column ggircs_portal.ciip_application_wizard.form_id is 'The id of the form';
comment on column ggircs_portal.ciip_application_wizard.form_position is 'The zero-indexed position of the form in the wizard';

commit;
