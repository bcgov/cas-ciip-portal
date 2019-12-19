-- Deploy ggircs-portal:table_review_comment to pg
-- requires: table_application
-- requires: table_form_json

begin;

create table ggircs_portal.review_comment (
  id integer primary key generated always as identity,
  application_id integer references ggircs_portal.application(id),
  form_id integer references ggircs_portal.form_json(id),
  description varchar(100000),
  resolved boolean,
  created_at timestamp with time zone not null default now(),
  created_by varchar(1000),
  updated_at timestamp with time zone not null default now(),
  updated_by varchar(1000),
  deleted_at timestamp with time zone,
  deleted_by varchar(1000)
);

comment on table ggircs_portal.review_comment is 'Table containing the information for a CIIP review_comment';
comment on column ggircs_portal.review_comment.id is 'Unique ID for the review_comment';
comment on column ggircs_portal.review_comment.application_id is 'Foreign Key to application';
comment on column ggircs_portal.review_comment.form_id is 'Foreign key to form_json';
comment on column ggircs_portal.review_comment.description is 'The comment on the review_comment';
comment on column ggircs_portal.review_comment.resolved is 'The resolved status on the review_comment';
comment on column ggircs_portal.review_comment.created_at is 'Creation date of row';
comment on column ggircs_portal.review_comment.created_by is 'Creator of row';
comment on column ggircs_portal.review_comment.updated_at is 'Updated date of row';
comment on column ggircs_portal.review_comment.updated_by is 'Updator of row';
comment on column ggircs_portal.review_comment.deleted_at is 'Date of deletion';
comment on column ggircs_portal.review_comment.deleted_by is 'The user who deleted the row';

commit;
