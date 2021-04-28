-- Deploy ggircs-portal:tables/application_004 to pg
-- requires: tables/application_003

begin;

update ggircs_portal.application set swrs_report_version=1;

commit;
