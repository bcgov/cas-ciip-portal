-- Revert ggircs-portal:trigger_functions/protect_date_overlap from pg

begin;

drop function ggircs_portal_private.protect_date_overlap;

commit;
