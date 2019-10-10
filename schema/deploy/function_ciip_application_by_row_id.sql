-- Deploy ggircs-portal:function_ciip_application_by_row_id to pg
-- requires: view_ciip_application

begin;

-- xxx add ddls here.
create function ciip_application_by_row_id(row_id int) returns ggircs_portal.ciip_application

commit;
