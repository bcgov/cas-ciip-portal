-- verify ggircs-portal:enum_operators on pg

begin;

select pg_get_functiondef('ggircs_portal_private.add_enum_comparison_operators(text)'::regprocedure);

rollback;
