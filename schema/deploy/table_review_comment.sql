-- Deploy ggircs-portal:table_review_comment to pg
-- requires: table_application_review

begin;

create table ggircs_portal.review_comment (
  id integer primary key generated always as identity,
  application_review_id int not null references ggircs_portal.application_review(id),
  description varchar(100000),
  status varchar(1000),
  created_at timestamp with time zone not null default now(),
  created_by varchar(1000),
  updated_at timestamp with time zone not null default now(),
  updated_by varchar(1000),
  deleted_at timestamp with time zone,
  deleted_by varchar(1000)
);

comment on table ggircs_portal.review_comment is 'Table containing the information for a CIIP review_comment';
comment on column ggircs_portal.review_comment.id is 'Unique ID for the review_comment';
comment on column ggircs_portal.review_comment.application_review_id is 'FK to application review';
comment on column ggircs_portal.review_comment.description is 'The comment on the review_comment';
comment on column ggircs_portal.review_comment.status is 'The status on the review_comment';
comment on column ggircs_portal.review_comment.created_at is 'Creation date of row';
comment on column ggircs_portal.review_comment.created_by is 'Creator of row';
comment on column ggircs_portal.review_comment.updated_at is 'Updated date of row';
comment on column ggircs_portal.review_comment.updated_by is 'Updator of row';
comment on column ggircs_portal.review_comment.deleted_at is 'Date of deletion';
comment on column ggircs_portal.review_comment.deleted_by is 'The user who deleted the row';

commit;
