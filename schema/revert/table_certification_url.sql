-- Revert ggircs-portal:table_certification_url from pg

begin;

drop table ggircs_portal.certification_url;

commit;
