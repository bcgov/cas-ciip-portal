-- Revert ggircs-portal:tables/application_002 from pg

begin;

alter table ggircs_portal.application drop column report_id;

commit;
