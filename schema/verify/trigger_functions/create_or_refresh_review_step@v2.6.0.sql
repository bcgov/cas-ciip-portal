-- Verify ggircs-portal:trigger_functions/create_or_refresh_review_step on pg

begin;

select pg_get_functiondef('ggircs_portal_private.create_or_refresh_review_step()'::regprocedure);

rollback;
