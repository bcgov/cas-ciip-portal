-- Verify ggircs-portal:trigger_functions/protect_date_overlap on pg

begin;

select pg_get_functiondef('ggircs_portal_private.protect_date_overlap()'::regprocedure);

rollback;
