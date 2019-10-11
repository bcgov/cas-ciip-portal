-- Revert ggircs-portal:view_ciip_operator from pg

begin;

drop view ggircs_portal.ciip_operator;

commit;
