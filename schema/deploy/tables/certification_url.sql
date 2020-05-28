-- Deploy ggircs-portal:table_certification_url to pg
-- requires: table_application

begin;

create table ggircs_portal.certification_url (
  id varchar(1000) primary key,
  certifier_url varchar(1000),
  application_id int not null references ggircs_portal.application(id),
  version_number int not null,
  certification_signature bytea,
  certified_by int references ggircs_portal.ciip_user(id),
  certified_at timestamp with time zone,
  form_results_md5 bytea,
  created_at timestamp with time zone not null default now(),
  created_by int references ggircs_portal.ciip_user(id),
  updated_at timestamp with time zone not null default now(),
  updated_by int references ggircs_portal.ciip_user(id),
  deleted_at timestamp with time zone,
  deleted_by int references ggircs_portal.ciip_user(id),
  send_certification_request boolean not null default true,
  certifier_email varchar(1000),
  certification_request_sent_at timestamp with time zone,
  recertification_request_sent boolean default false,
  expires_at timestamp with time zone not null default now(),
  foreign key (application_id, version_number) references ggircs_portal.application_revision(application_id, version_number)
);

create trigger _random_id
  before insert on ggircs_portal.certification_url
  for each row
  execute procedure ggircs_portal_private.set_random_id();

create trigger _100_timestamps
  before insert or update on ggircs_portal.certification_url
  for each row
  execute procedure ggircs_portal_private.update_timestamps();

-- Sets expires_at column for 7 days from creation
create trigger _set_expiry
  before insert on ggircs_portal.certification_url
  for each row
  execute procedure ggircs_portal_private.set_expiry('7 days');

create trigger _create_form_result_md5
  before insert on ggircs_portal.certification_url
  for each row
  execute procedure ggircs_portal_private.signature_md5();

create trigger _check_form_result_md5
  before update of certification_signature on ggircs_portal.certification_url
  for each row
  execute procedure ggircs_portal_private.signature_md5();

create trigger _set_user_id
  before update of certification_signature on ggircs_portal.certification_url
  for each row
  execute procedure ggircs_portal_private.set_user_id('certification_url');

create trigger _certification_request_email
  before update of certifier_email on ggircs_portal.certification_url
  for each row
  execute procedure ggircs_portal_private.run_graphile_worker_job('certification_request');

create trigger _signed_by_certifier_email
  before update of certification_signature on ggircs_portal.certification_url
  for each row
  execute procedure ggircs_portal_private.run_graphile_worker_job('signed_by_certifier');

create trigger _recertification_request
  before update of recertification_request_sent on ggircs_portal.certification_url
  for each row
  execute procedure ggircs_portal_private.run_graphile_worker_job('recertification');


do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'certification_url', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'certification_url', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'certification_url', 'ciip_analyst');

-- Grant ciip_industry_user permissions
perform ggircs_portal_private.grant_permissions('select', 'certification_url', 'ciip_industry_user');
perform ggircs_portal_private.grant_permissions('insert', 'certification_url', 'ciip_industry_user');
perform ggircs_portal_private.grant_permissions('update', 'certification_url', 'ciip_industry_user', ARRAY['certification_signature', 'certifier_url', 'recertification_request_sent', 'certifier_email', 'send_certification_request']);

-- Grant ciip_guest permissions
-- ?
end
$grant$;

-- Enable row-level security
alter table ggircs_portal.certification_url enable row level security;

comment on table ggircs_portal.certification_url is 'Table containing the certification_url for an application';
comment on column ggircs_portal.certification_url.id is 'Unique ID for the certification_url';
comment on column ggircs_portal.certification_url.certifier_url is 'The URL sent to the certifier';
comment on column ggircs_portal.certification_url.application_id is 'Foreign key to the application';
comment on column ggircs_portal.certification_url.version_number is 'The version number of the application (foreign key to application_revision along with application_id)';
comment on column ggircs_portal.certification_url.certification_signature is 'The base64 representation of the certifier''s signature';
comment on column ggircs_portal.certification_url.certified_by is 'The user id of the certifier references ggircs_portal.ciip_user';
comment on column ggircs_portal.certification_url.certified_at is 'The timestamp of when the signature was added';
comment on column ggircs_portal.certification_url.form_results_md5 is 'The hash of all form results at the time the signature was added';
comment on column ggircs_portal.certification_url.created_at is 'Creation date of row';
comment on column ggircs_portal.certification_url.created_by is 'Creator of row';
comment on column ggircs_portal.certification_url.updated_at is 'Last update date of row';
comment on column ggircs_portal.certification_url.updated_by is 'The user who last updated the row';
comment on column ggircs_portal.certification_url.deleted_at is 'Deletion date of row';
comment on column ggircs_portal.certification_url.send_certification_request is 'User defined boolean indicates whether to send an email to the certifier';
comment on column ggircs_portal.certification_url.certifier_email is 'The email that the certification request was sent to';
comment on column ggircs_portal.certification_url.certification_request_sent_at is 'The time at which the certification request was sent';
comment on column ggircs_portal.certification_url.recertification_request_sent is 'Boolean for whether a recertification request has been sent to the reporter in the case of a data change';
comment on column ggircs_portal.certification_url.deleted_by is 'The user who deleted the row';
comment on column ggircs_portal.certification_url.expires_at is 'The expiry date for the row';

commit;
