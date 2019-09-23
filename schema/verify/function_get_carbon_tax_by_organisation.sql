-- Verify ggircs-portal:function_get_carbon_tax_by_organisation on pg

BEGIN;

select pg_get_functiondef('ggircs_portal.get_carbon_tax_by_bcghgid(numeric,text)'::regprocedure);


ROLLBACK;
