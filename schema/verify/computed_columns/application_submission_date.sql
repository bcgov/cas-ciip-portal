-- Verify ggircs-portal:computed_columns/application_submission_date on pg

begin;

select pg_get_functiondef('ggircs_portal.application_submission_date(ggircs_portal.application)'::regprocedure);

rollback;
