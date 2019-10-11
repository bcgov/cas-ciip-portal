-- Verify ggircs-portal:function_import_from_swrs on pg

begin;

select pg_get_functiondef('ggircs_portal.get_swrs_facility_data(integer, varchar)'::regprocedure);

ROLLBACK;
