-- disable unnecessary triggers
-- add ciip_user_organisation connection if not set
-- refresh application data with truncate & create_application_mutation_chain
-- set legal-disclaimer true to skip checkboxes

begin;

update ggircs_portal.product set state = 'archived';

commit;
