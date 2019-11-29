-- Deploy ggircs-portal:table_application_review to pg
-- requires: table_application
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.application_review (
    id integer primary key generated always as identity,
    form_result_id integer not null references ggircs_portal.form_result(id),
    review_status ggircs_portal.application_review_status,
    created_at timestamp with time zone not null default now(),
    created_by varchar(1000),
    updated_at timestamp with time zone not null default now(),
    updated_by varchar(1000),
    deleted_at timestamp with time zone,
    deleted_by varchar(1000)
);

comment on table ggircs_portal.application_review is 'The application review done by analyst';
comment on column ggircs_portal.application_review.id is 'The application_review id used for reference and join';
comment on column ggircs_portal.application_review.form_result_id is 'The foreign key to form_result for reference and join';
comment on column ggircs_portal.application_review.review_status is 'The foreign key to form_json for reference and join';
comment on column ggircs_portal.application_review.created_at is 'Creation date of row';
comment on column ggircs_portal.application_review.created_by is 'Creator of row';
comment on column ggircs_portal.application_review.updated_at is 'Updated date of row';
comment on column ggircs_portal.application_review.updated_by is 'Updator of row';
comment on column ggircs_portal.application_review.deleted_at is 'Date of deletion';
comment on column ggircs_portal.application_review.deleted_by is 'The user who deleted the row';

commit;
