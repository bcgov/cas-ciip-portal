-- Verify ggircs-portal:function_import_swrs_organisation_facility on pg

begin;

select pg_get_functiondef('ggircs_portal.import_swrs_organisation_facility()'::regprocedure);

rollback;
