-- Deploy ggircs-portal:tables/ciip_application_wizard_001 to pg
-- requires: tables/ciip_application_wizard

begin;

alter table ggircs_portal.ciip_application_wizard add column is_active boolean default true;
drop index ggircs_portal.ciip_application_wizard_form_position_uindex;

comment on column ggircs_portal.ciip_application_wizard.is_active is 'Boolean value indicates whether the form is currently in use or has been archived';

commit;
