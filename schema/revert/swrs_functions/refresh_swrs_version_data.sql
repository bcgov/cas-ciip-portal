-- Revert ggircs-portal:swrs_functions/refresh_swrs_version_data from pg

begin;

drop function ggircs_portal_private.refresh_swrs_version_data;

commit;
