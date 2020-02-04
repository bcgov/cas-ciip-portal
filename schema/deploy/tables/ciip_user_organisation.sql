-- Deploy ggircs-portal:table_user_organisation to pg
-- requires: schema_ggircs_portal
-- requires: table_user
-- requires: table_organisation
-- requires: type_user_organisation_status

begin;

  create table ggircs_portal.ciip_user_organisation (
      id integer primary key generated always as identity,
      user_id integer not null references ggircs_portal.ciip_user (id),
      organisation_id integer not null references ggircs_portal.organisation (id),
      status ggircs_portal.ciip_user_organisation_status
  );

  create trigger _set_user_id
    before insert on ggircs_portal.ciip_user_organisation
    for each row
    execute procedure ggircs_portal.set_user_id();

  create unique index user_organisation_user_id_organisation_id_uindex on ggircs_portal.ciip_user_organisation(user_id, organisation_id);

  do
  $grant$
  begin
    -- Grant ciip_administrator permissions
    perform ggircs_portal_private.grant_permissions('select', 'ciip_user_organisation', 'ciip_administrator');
    perform ggircs_portal_private.grant_permissions('insert', 'ciip_user_organisation', 'ciip_administrator');
    perform ggircs_portal_private.grant_permissions('update', 'ciip_user_organisation', 'ciip_administrator');

    -- Grant ciip_analyst permissions
    perform ggircs_portal_private.grant_permissions('select', 'ciip_user_organisation', 'ciip_analyst');

    -- Grant ciip_industry_user permissions
    perform ggircs_portal_private.grant_permissions('select', 'ciip_user_organisation', 'ciip_industry_user');
    perform ggircs_portal_private.grant_permissions('insert', 'ciip_user_organisation', 'ciip_industry_user');

    -- Grant ciip_guest permissions
    -- ?
  end
  $grant$;

  -- Enable row-level security
  alter table ggircs_portal.ciip_user_organisation enable row level security;

  do
  $policy$
  begin
    -- ciip_administrator RLS
    perform ggircs_portal_private.upsert_policy('ciip_administrator_select_ciip_user_organisation', 'ciip_user_organisation', 'select', 'ciip_administrator', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_ciip_user_organisation', 'ciip_user_organisation', 'insert', 'ciip_administrator', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_administrator_update_ciip_user_organisation', 'ciip_user_organisation', 'update', 'ciip_administrator', 'true');

    -- ciip_analyst RLS
    perform ggircs_portal_private.upsert_policy('ciip_analyst_select_ciip_user_organisation', 'ciip_user_organisation', 'select', 'ciip_analyst', 'true');

    -- ciip_industry_user RLS
    perform ggircs_portal_private.upsert_policy(
      'ciip_industry_user_select_ciip_user_organisation',
      'ciip_user_organisation',
      'select',
      'ciip_industry_user',
      $$user_id=(select id from ggircs_portal.ciip_user where uuid = (select sub from ggircs_portal.session()))$$
    );
    perform ggircs_portal_private.upsert_policy('ciip_industry_user_insert_ciip_user_organisation', 'ciip_user_organisation', 'insert', 'ciip_industry_user', $$user_id=(select id from ggircs_portal.ciip_user where uuid = (select sub from ggircs_portal.session())) and status='pending'$$);

  end
  $policy$;

  comment on table ggircs_portal.ciip_user_organisation is 'Table containing the access rights for a user to report on behalf of an organisation';
  comment on column ggircs_portal.ciip_user_organisation.id is 'ciip_user_organisation primary key';
  comment on column ggircs_portal.ciip_user_organisation.user_id is 'foreign key that references the user table';
  comment on column ggircs_portal.ciip_user_organisation.organisation_id is 'foreign key that references the organisation table';
  comment on column ggircs_portal.ciip_user_organisation.status is 'the status of the request to report on behalf of an organisation';

commit;
