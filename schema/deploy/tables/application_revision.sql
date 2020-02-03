-- Deploy ggircs-portal:table_application_revision to pg
-- requires: table_application

begin;

create table ggircs_portal.application_revision (
    application_id int not null references ggircs_portal.application(id),
    version_number int not null,
    certification_signature bytea,
    legal_disclaimer_accepted boolean not null default false,
    user_id integer references ggircs_portal.ciip_user(id),
    created_at timestamp with time zone not null default now(),
    created_by int references ggircs_portal.ciip_user,
    updated_at timestamp with time zone not null default now(),
    updated_by int references ggircs_portal.ciip_user,
    deleted_at timestamp with time zone,
    deleted_by int references ggircs_portal.ciip_user,
    primary key (application_id, version_number)
);

create unique index ggircs_portal_application_revision_primary_key on ggircs_portal.application_revision (application_id, version_number);
create index ggircs_portal_application_revision_application_foreign_key on ggircs_portal.application_revision(application_id);

create trigger _100_timestamps
  before insert or update on ggircs_portal.application_revision
  for each row
  execute procedure ggircs_portal.update_timestamps();

-- Sets user id by session on update of certification_signature
create trigger _set_user_id
    before update of certification_signature on ggircs_portal.application_revision
    for each row
    execute procedure ggircs_portal.set_user_id();

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal.grant_permissions('select', 'application_revision', 'ciip_administrator');
perform ggircs_portal.grant_permissions('insert', 'application_revision', 'ciip_administrator');
perform ggircs_portal.grant_permissions('update', 'application_revision', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal.grant_permissions('select', 'application_revision', 'ciip_analyst');

-- Grant ciip_industry_user permissions
perform ggircs_portal.grant_permissions('select', 'application_revision', 'ciip_industry_user');
perform ggircs_portal.grant_permissions('insert', 'application_revision', 'ciip_industry_user');
perform ggircs_portal.grant_permissions('update', 'application_revision', 'ciip_industry_user');

-- Grant ciip_guest permissions
-- ?
end
$grant$;

-- Enable row-level security
alter table ggircs_portal.application_revision enable row level security;

create or replace function ggircs_portal.get_valid_applications_via_revision()
returns setof integer as
$definer$
  select ar.application_id from ggircs_portal.application_revision ar
    join ggircs_portal.application a
      on ar.application_id = a.id
    join ggircs_portal.facility f
      on a.facility_id = f.id
    join ggircs_portal.ciip_user_organisation cuo
      on f.organisation_id = cuo.organisation_id
    join ggircs_portal.ciip_user cu
      on cuo.user_id = cu.id
      and cu.uuid = (select sub from ggircs_portal.session());
$definer$ language sql strict stable security definer;

do
$policy$
declare industry_user_statement text;
begin
-- ciip_administrator RLS
perform ggircs_portal.upsert_policy('ciip_administrator_select_application_revision', 'application_revision', 'select', 'ciip_administrator', 'true');
perform ggircs_portal.upsert_policy('ciip_administrator_insert_application_revision', 'application_revision', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal.upsert_policy('ciip_administrator_update_application_revision', 'application_revision', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal.upsert_policy('ciip_analyst_select_application_revision', 'application_revision', 'select', 'ciip_analyst', 'true');

-- statement for select using & insert with check
industry_user_statement := 'application_id in (select ggircs_portal.get_valid_applications_via_revision())' ;

-- ciip_industry_user RLS
perform ggircs_portal.upsert_policy('ciip_industry_user_select_application_revision', 'application_revision', 'select', 'ciip_industry_user', industry_user_statement);
perform ggircs_portal.upsert_policy('ciip_industry_user_insert_application_revision', 'application_revision', 'insert', 'ciip_industry_user', industry_user_statement);
perform ggircs_portal.upsert_policy('ciip_industry_user_update_application_revision', 'application_revision', 'update', 'ciip_industry_user', industry_user_statement);

end
$policy$;

comment on table ggircs_portal.application_revision is 'The application revision data';

comment on column ggircs_portal.application_revision.application_id is 'The foreign key to the ciip application, also part of the composite primary key with version number';
comment on column ggircs_portal.application_revision.version_number is 'The version number of the revision, also part of the composite primary key with application_id';
comment on column ggircs_portal.application_revision.certification_signature is 'The base64 representation of the certifier''s signature';
comment on column ggircs_portal.application_revision.user_id is 'The certifier''s user id, references ciip_user';
comment on column ggircs_portal.application_revision.created_at is 'The date the application revision status was updated';
comment on column ggircs_portal.application_revision.created_by is 'The person who updated the application revision status';
comment on column ggircs_portal.application_revision.updated_at is 'The date the application revision status was updated';
comment on column ggircs_portal.application_revision.updated_by is 'The person who updated the application revision status';
comment on column ggircs_portal.application_revision.deleted_at is 'The date the application revision status was deleted';
comment on column ggircs_portal.application_revision.deleted_by is 'The person who deleted the application revision status';
comment on column ggircs_portal.application_revision.legal_disclaimer_accepted is 'Whether or not reporter agreed the legal disclaimer';

commit;
