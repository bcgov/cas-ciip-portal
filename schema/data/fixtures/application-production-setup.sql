-- disable unnecessary triggers
-- add ciip_user_organisation connection if not set
-- refresh application data with truncate & create_application_mutation_chain
-- set legal-disclaimer true to skip checkboxes

begin;

alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=7;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 7, 'approved');
truncate ggircs_portal.application restart identity cascade;
select ggircs_portal.create_application_mutation_chain(1);
select ggircs_portal.create_application_mutation_chain(2);
update ggircs_portal.application_revision set legal_disclaimer_accepted=true where application_id=2 and version_number=1;
insert into ggircs_portal.product(name, units, state, requires_emission_allocation, requires_product_amount)
  values ('non ciip','tonnes of aluminum produced','active', false, false);

commit;
