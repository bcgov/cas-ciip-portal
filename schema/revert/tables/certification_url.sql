-- Revert ggircs-portal:table_certification_url from pg

begin;

drop table ggircs_portal.certification_url;
drop function ggircs_portal_private.get_valid_applications_via_certification_url;

commit;
