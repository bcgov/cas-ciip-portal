-- Revert ggircs-portal:trigger_functions/create_or_refresh_review_step from pg

begin;

drop function ggircs_portal_private.create_or_refresh_review_step;

commit;
