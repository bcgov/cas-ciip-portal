-- Revert ggircs-portal:enum_operators from pg

begin;

drop function ggircs_portal_private.add_enum_comparison_operators;

commit;
