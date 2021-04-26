-- Revert ggircs-portal:tables/application_003 from pg

begin;

alter table ggircs_portal.application drop column swrs_report_id;
alter table ggircs_portal.application drop column swrs_report_version;
alter table ggircs_portal.application add column report_id integer;

comment on column ggircs_portal.application.report_id is 'The id of the swrs report (swrs.report.id) that was imported when starting the application';


commit;
