-- disable unnecessary triggers
-- add ciip_user_organisation connection if not set
-- refresh application data with truncate & create_application_mutation_chain
-- set legal-disclaimer to false to trigger legal checkbox pages
-- update form_result data so that there are no errors & reporter can move through all pages

begin;

delete from ggircs_portal.certification_url where application_id=2;

select test_helper.modify_triggers('enable');

do \$$
  declare disable_triggers json;
  begin
    disable_triggers := '
      {
        "application": ["_send_draft_application_email"],
        "certification_url": ["_signed_by_certifier_email", "_certification_request_email"],
        "application_revision_status": ["_status_change_email"],
        "ciip_user_organisation": ["_send_access_approved_email", "_send_request_for_access_email", "_set_user_id"]
      }
    ';
    perform test_helper.modify_triggers('disable', disable_triggers);
  end;
\$$;

delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=7;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 7, 'approved');
truncate ggircs_portal.application restart identity cascade;
select ggircs_portal.create_application_mutation_chain(1);
select ggircs_portal.create_application_mutation_chain(2);
update ggircs_portal.application_revision set legal_disclaimer_accepted = false where application_id=2 and version_number=1;

-- Ensure products referenced in form_result are in the database
truncate ggircs_portal.product restart identity cascade;

insert into ggircs_portal.product(id, product_name, units, product_state, requires_emission_allocation, requires_product_amount)
overriding system value
values
(26, 'Coal','tonnes','published', true, true),
(29, 'Other Pulp (Mechanical pulp, paper, newsprint)', 'bone-dry tonnes','published', true, true);

-- Ensure all form results contain no errors
select test_helper.initialize_form_result(2,1);

commit;
