-- Revert ggircs-portal:tables/application_003 from pg

begin;

alter table ggircs_portal.application drop column swrs_report_id;

commit;
