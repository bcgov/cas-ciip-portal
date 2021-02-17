-- Verify ggircs-portal:computed_columns/ciip_user_organisation_email_address on pg

begin;

select pg_get_functiondef('ggircs_portal.ciip_user_organisation_email_address(ggircs_portal.ciip_user_organisation)'::regprocedure);

rollback;
