-- Deploy ggircs-portal:tables/application_review_step to pg
-- requires: tables/application

begin;

create table ggircs_portal.application_review_step (
  id integer primary key generated always as identity,
  application_id integer not null references ggircs_portal.application(id),
  review_step_id integer not null references ggircs_portal.review_step(id),
  is_complete boolean default false,
  created_at timestamp with time zone not null default now(),
  created_by int references ggircs_portal.ciip_user(id),
  updated_at timestamp with time zone not null default now(),
  updated_by int references ggircs_portal.ciip_user(id),
  deleted_at timestamp with time zone,
  deleted_by int references ggircs_portal.ciip_user(id)
);

create unique index ggircs_portal_application_review_step_on_app_id_and_review_step_id on ggircs_portal.application_review_step(application_id, review_step_id);

create index ggircs_portal_application_review_step_application_foreign_key on ggircs_portal.application_review_step(application_id);
create index ggircs_portal_application_review_step_review_step_foreign_key on ggircs_portal.application_review_step(review_step_id);
create index ggircs_portal_application_review_step_created_by_foreign_key on ggircs_portal.application_review_step(created_by);
create index ggircs_portal_application_review_step_updated_by_foreign_key on ggircs_portal.application_review_step(updated_by);
create index ggircs_portal_application_review_step_deleted_by_foreign_key on ggircs_portal.application_review_step(deleted_by);

create trigger _100_timestamps
  before insert or update on ggircs_portal.application_review_step
  for each row
  execute procedure ggircs_portal_private.update_timestamps();

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'application_review_step', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'application_review_step', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'application_review_step', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'application_review_step', 'ciip_analyst');
perform ggircs_portal_private.grant_permissions('insert', 'application_review_step', 'ciip_analyst');
perform ggircs_portal_private.grant_permissions('update', 'application_review_step', 'ciip_analyst');

end
$grant$;

-- Enable row-level security
alter table ggircs_portal.application_review_step enable row level security;

comment on table ggircs_portal.application_review_step is 'Information about specific review steps and their state(is_complete). An application can not move out of a pending review without all required review_steps being complete.';
comment on column ggircs_portal.application_review_step.id is 'Unique ID for the application_review_step';
comment on column ggircs_portal.application_review_step.application_id is 'The ID of the application this application_review_step belongs to. Foreign Key to application(id';
comment on column ggircs_portal.application_review_step.review_step_id is 'The foreign key ID to the review_step to be applied to this row';
comment on column ggircs_portal.application_review_step.is_complete is 'The boolean completed state of this application_review_step';
comment on column ggircs_portal.application_review_step.created_at is 'Timestamp of when this application_review_step was created';
comment on column ggircs_portal.application_review_step.created_by is 'The ID of the user who created this application_review_step, references ciip_user.id';
comment on column ggircs_portal.application_review_step.updated_at is 'Timestamp of when this application_review_step was last updated';
comment on column ggircs_portal.application_review_step.updated_by is 'The ID of the user who last updated this application_review_step, references ciip_user.id';
comment on column ggircs_portal.application_review_step.deleted_at is 'Timestamp of when this application_review_step was deprecated';
comment on column ggircs_portal.application_review_step.deleted_by is 'The ID of the user who deprecated this application_review_step, references ciip_user.id';

commit;
