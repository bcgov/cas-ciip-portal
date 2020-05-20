-- Deploy ggircs-portal:table_review_comment to pg
-- requires: table_application
-- requires: table_form_json

begin;

create table ggircs_portal.review_comment (
  id integer primary key generated always as identity,
  application_id integer not null references ggircs_portal.application(id),
  form_id integer not null references ggircs_portal.form_json(id),
  description varchar(100000),
  comment_type ggircs_portal.review_comment_type,
  resolved boolean,
  created_at timestamp with time zone not null default now(),
  created_by int references ggircs_portal.ciip_user,
  updated_at timestamp with time zone not null default now(),
  updated_by int references ggircs_portal.ciip_user,
  deleted_at timestamp with time zone,
  deleted_by int references ggircs_portal.ciip_user
);

create index ggircs_portal_review_comment_application_foreign_key on ggircs_portal.review_comment(application_id);
create index ggircs_portal_review_comment_form_json_foreign_key on ggircs_portal.review_comment(form_id);

create trigger _100_timestamps
  before insert or update on ggircs_portal.review_comment
  for each row
  execute procedure ggircs_portal_private.update_timestamps();

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'review_comment', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'review_comment', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'review_comment', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'review_comment', 'ciip_analyst');
perform ggircs_portal_private.grant_permissions('insert', 'review_comment', 'ciip_analyst');
perform ggircs_portal_private.grant_permissions('update', 'review_comment', 'ciip_analyst');

-- Grant ciip_industry_user permissions
perform ggircs_portal_private.grant_permissions('select', 'review_comment', 'ciip_industry_user');

-- Grant ciip_guest permissions
-- ?
end
$grant$;

-- Enable row-level security
alter table ggircs_portal.review_comment enable row level security;

comment on table ggircs_portal.review_comment is 'Table containing the information for a CIIP review_comment';
comment on column ggircs_portal.review_comment.id is 'Unique ID for the review_comment';
comment on column ggircs_portal.review_comment.application_id is 'Foreign Key to application';
comment on column ggircs_portal.review_comment.form_id is 'Foreign key to form_json';
comment on column ggircs_portal.review_comment.description is 'The comment on the review_comment';
comment on column ggircs_portal.review_comment.comment_type is 'The type of the review_comment (determines who can see the comment)';
comment on column ggircs_portal.review_comment.resolved is 'The resolved status on the review_comment';
comment on column ggircs_portal.review_comment.created_at is 'Creation date of row';
comment on column ggircs_portal.review_comment.created_by is 'Creator of row';
comment on column ggircs_portal.review_comment.updated_at is 'Updated date of row';
comment on column ggircs_portal.review_comment.updated_by is 'Updator of row';
comment on column ggircs_portal.review_comment.deleted_at is 'Date of deletion';
comment on column ggircs_portal.review_comment.deleted_by is 'The user who deleted the row';

commit;
