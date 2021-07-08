-- Deploy ggircs-portal:enum_operators to pg
-- https://github.com/metabase/metabase/issues/7092

begin;

create or replace function ggircs_portal_private.add_enum_comparison_operators(schema_name text)
  returns void as
$func$
declare
  r         record;
  code_     text;
  enum_name text;
  cmp_func  text;
begin
  for r in (
    select distinct
      n.nspname as schema,
      t.typname as name
    from pg_type t
    join pg_enum e on t.oid = e.enumtypid
    join pg_catalog.pg_namespace n on n.oid = t.typnamespace
    where n.nspname = schema_name
  )
    loop
      enum_name := r.schema || $$.$$ || r.name;
      cmp_func := r.schema || $$._cmp_$$ || r.name || $$__text$$;
      code_ := $$
    create or replace function $$ || cmp_func || $$(_a $$ || enum_name || $$, _b text)
    returns boolean as
    $f$
        select _a = _b::$$ || enum_name || $$;
    $f$
    language sql immutable strict;

  -- no replace, so drop and recreate
  drop operator if exists = ($$ || enum_name || $$, text);

  create operator = (
    leftarg = $$ || enum_name || $$,
    rightarg = text,
    procedure = $$ || cmp_func || $$,
    commutator = =,
    negator = !=,
    hashes, merges
);$$;
      raise notice 'creating enum operator: %', enum_name;
      execute code_;
    end loop;
end
$func$ language 'plpgsql';

comment on function ggircs_portal_private.add_enum_comparison_operators(text) is 'A function adding enum to text comparison operators for metabase usage.';

commit;
