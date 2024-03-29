begin;

  -- Temporarily disable _set_user_id trigger in order to hardcode user_id into table ccip_user_organisation
  alter table ggircs_portal.ciip_user_organisation
    disable trigger _set_user_id;
  alter table ggircs_portal.ciip_user_organisation
    disable trigger _send_request_for_access_email;
  alter table ggircs_portal.ciip_user_organisation
    disable trigger _send_access_approved_email;

  -- giving cypresstestreporter && test user access to some organisations by default
  with rows as (
  insert into ggircs_portal.ciip_user_organisation(id, user_id, organisation_id, status)
  overriding system value
  values
  (1, 3, 2, 'approved'),
  (2, 3, 3, 'approved'),
  (3, 3, 4, 'approved'),
  (4, 3, 5, 'approved'),
  (5, 3, 6, 'approved'),
  (6, 6, 2, 'approved'),
  (7, 6, 3, 'approved'),
  (8, 6, 4, 'approved'),
  (9, 6, 5, 'approved'),
  (10, 6, 6, 'approved')
  on conflict(id) do update set
    user_id=excluded.user_id,
    organisation_id=excluded.organisation_id,
    status=excluded.status
  returning 1
  ) select 'Inserted ' || count(*) || ' rows into ggircs_portal.ciip_user_organisation' from rows;

  select setval from
  setval('ggircs_portal.ciip_user_organisation_id_seq', (select max(id) from ggircs_portal.ciip_user_organisation), true)
  where setval = 0;

  -- Re-enable _set_user_id trigger
  alter table ggircs_portal.ciip_user_organisation
    enable trigger _set_user_id;
  alter table ggircs_portal.ciip_user_organisation
    enable trigger _send_request_for_access_email;
  alter table ggircs_portal.ciip_user_organisation
    enable trigger _send_access_approved_email;

commit;
