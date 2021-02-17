-- Verify ggircs-portal:computed_columns/ciip_user_organisation_last_name on pg

begin;

select pg_get_functiondef('ggircs_portal.ciip_user_organisation_last_name(ggircs_portal.ciip_user_organisation)'::regprocedure);

rollback;
