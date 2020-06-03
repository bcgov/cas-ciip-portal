/**
  Give user id=3 (Test User) access to the 2 organisations & facilities that the dummy applications have been created for.
  Removes need for developer to request access to these organisations after each sqitch down/up.
*/

begin;

  -- Temporarily disable _set_user_id trigger in order to hardcode user_id into table ccip_user_organisation
  alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
  alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_request_for_access_email;

  with rows as (
  insert into ggircs_portal.ciip_user_organisation(id, user_id, organisation_id, status)
  overriding system value
  values
  (1, 3, 8, 'approved'),
  (2, 3, 7, 'approved')
  on conflict(id) do update set
    user_id=excluded.user_id,
    organisation_id=excluded.organisation_id,
    status=excluded.status
  returning 1
  ) select 'Inserted ' || count(*) || ' rows into ggircs_portal.certification_url' from rows;

  select setval from
  setval('ggircs_portal.ciip_user_organisation_id_seq', (select max(id) from ggircs_portal.ciip_user_organisation), true)
  where setval = 0;

  -- Re-enable _set_user_id trigger
  alter table ggircs_portal.ciip_user_organisation
  enable trigger _set_user_id;
  alter table ggircs_portal.ciip_user_organisation
  enable trigger _send_request_for_access_email;

commit;
