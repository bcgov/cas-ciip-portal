-- Deploy ggircs-portal:tables/application_002 to pg
-- requires: tables/application

begin;

alter table ggircs_portal.application add column report_id integer;

comment on column ggircs_portal.application.report_id is 'The id of the swrs report (swrs.report.id) that was imported when starting the application';

commit;
