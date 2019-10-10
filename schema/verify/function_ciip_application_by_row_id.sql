-- Verify ggircs-portal:function_ciip_application_by_row_id on pg

begin;

select pg_get_functiondef('ggircs_portal.ciip_application_by_row_id(int)'::regprocedure);

rollback;
