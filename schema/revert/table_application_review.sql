-- Revert ggircs-portal:table_application_review from pg

begin;

drop table ggircs_portal.application_review;

commit;
