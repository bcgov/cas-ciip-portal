-- Deploy ggircs-portal:tables/form_result_status to pg
-- requires: tables/form_result

begin;

create table ggircs_portal.form_result_status (
    id integer primary key generated always as identity,
    application_id int not null references ggircs_portal.application(id),
    form_id int not null,
    form_result_status ggircs_portal.ciip_form_result_status,
    created_at timestamp with time zone not null default now(),
    created_by int references ggircs_portal.ciip_user,
    updated_at timestamp with time zone not null default now(),
    updated_by int references ggircs_portal.ciip_user,
    deleted_at timestamp with time zone,
    deleted_by int references ggircs_portal.ciip_user
);

create index ggircs_portal_form_result_status_foreign_key on ggircs_portal.form_result_status(application_id);

create trigger _100_timestamps
  before insert or update on ggircs_portal.form_result_status
  for each row
  execute procedure ggircs_portal.update_timestamps();

grant all on table ggircs_portal.form_result_status to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

comment on table ggircs_portal.form_result_status is 'The form result status data';
comment on column ggircs_portal.form_result_status.id is 'The id used for reference and join';
comment on column ggircs_portal.form_result_status.application_id is 'The foreign key to application used for reference and join';
comment on column ggircs_portal.form_result_status.form_id is 'The form id (form_json) this status is attached to';
comment on column ggircs_portal.form_result_status.form_result_status is 'The form result status';
comment on column ggircs_portal.form_result_status.created_at is 'The date the form result status was updated';
comment on column ggircs_portal.form_result_status.created_by is 'The person who updated the form result status';
comment on column ggircs_portal.form_result_status.updated_at is 'The date the form result status was updated';
comment on column ggircs_portal.form_result_status.updated_by is 'The person who updated the form result status';
comment on column ggircs_portal.form_result_status.deleted_at is 'The date the form result status was deleted';
comment on column ggircs_portal.form_result_status.deleted_by is 'The person who deleted the form result status';

commit;
