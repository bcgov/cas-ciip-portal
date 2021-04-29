-- Deploy ggircs-portal:tables/application_004 to pg
-- requires: tables/application_003

begin;

/**
  The previous migration (application_003) set the swrs_report_version for all applications to the latest version.
  This was wrong, since many of the application's swrs versions (version 0 of the application) are not up to date.
  Setting the swrs_report_version to 1 for all applications ensures that applications that require
  a swrs update to their version 0 data (via the refresh_swrs_version_data() function) will receive it.
**/
update ggircs_portal.application set swrs_report_version=1;

commit;
