begin;

  -- Set the current reporting year to 2018, application open
  select mocks.set_mocked_time_in_transaction(
    (
      select application_open_time
      from ggircs_portal.reporting_year
      where reporting_year = 2018
    )
  );

  alter table ggircs_portal.application disable trigger _send_draft_application_email;
  alter table ggircs_portal.application_revision_status disable trigger _status_change_email;
  alter table ggircs_portal.certification_url disable trigger _certification_request_email;
  alter table ggircs_portal.certification_url disable trigger _signed_by_certifier_email;

  -- Set a jwt token so that the created_by columns are not null on creation of application;
  set jwt.claims.sub to '00000000-0000-0000-0000-000000000000';

   -- Create applications
  select 'Calling ggircs_portal.create_application_mutation_chain: ';
  select ggircs_portal.create_application_mutation_chain(2);
  select ggircs_portal.create_application_mutation_chain(3);

  insert into ggircs_portal.certification_url(id, application_id, version_number)
  overriding system value
  values ('\xad58dd1b39a4dff1cc1e0bb1dce2d80793b85e1be4d465f6b598aa5e44558065', 3, 1)
  on conflict(id) do update set application_id=excluded.application_id, version_number=excluded.version_number;

  update ggircs_portal.certification_url set certification_signature = 'signed' where application_id =3 and version_number=1;

  update ggircs_portal.application_revision_status set application_revision_status='submitted' where application_id=3 and version_number=1;
  -- Create an application revision on application id=3
  select ggircs_portal.create_review_comment_mutation_chain(
    3, 1,
    'This is a comment','requested change'
  );
  update ggircs_portal.application_revision_status set application_revision_status='requested changes' where application_id=3 and version_number=1;

  -- Set legal_disclaimer_accepted to true for application id=3
  update ggircs_portal.application_revision set legal_disclaimer_accepted = true where application_id=3;


  alter table ggircs_portal.application_revision_status enable trigger _status_change_email;
  alter table ggircs_portal.application enable trigger _send_draft_application_email;
  alter table ggircs_portal.certification_url enable trigger _certification_request_email;
  alter table ggircs_portal.certification_url enable trigger _signed_by_certifier_email;

commit;
