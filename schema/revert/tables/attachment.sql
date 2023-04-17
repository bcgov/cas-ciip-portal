-- Revert ggircs-portal:tables/attachment from pg

begin;

drop table ggircs_portal.attachment;

commit;
