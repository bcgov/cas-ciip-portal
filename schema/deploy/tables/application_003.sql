-- Deploy ggircs-portal:tables/application_003 to pg
-- requires: tables/application_002

begin;

alter table ggircs_portal.application add column swrs_report_id integer;
comment on column ggircs_portal.application.swrs_report_id is 'The swrs id of the swrs report (swrs.report.swrs_report_id). This id is the id assigned by SWRS (Single Window Reporting System) when the report was filed federally. This id is different from report_id (swrs.report.id) as that ID is generated by our ETL process';

alter table ggircs_portal.application add column swrs_report_version varchar(1000);
comment on column ggircs_portal.application.swrs_report_version is 'The version of the swrs report this application was populated from. Corresponds to swrs.report.version';

alter table ggircs_portal.application drop column report_id;

with app_swrs as (
  select a.id, r.swrs_report_id, r.version
    from swrs.report r
    join ggircs_portal.facility f
    on r.swrs_facility_id = f.swrs_facility_id
    join ggircs_portal.application a
    on f.id = a.facility_id
    and a.reporting_year = r.reporting_period_duration
)
update ggircs_portal.application a_outer
set swrs_report_id = (select swrs_report_id from app_swrs where id = a_outer.id),
swrs_report_version = (select version from app_swrs where id = a_outer.id)
where a_outer.id = (select id from app_swrs where id = a_outer.id);

commit;
