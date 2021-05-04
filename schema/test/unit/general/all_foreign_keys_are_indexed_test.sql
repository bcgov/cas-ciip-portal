set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(1);

select is_empty(
  $$
    WITH indexed_tables AS (
      select
          ns.nspname,
          t.relname as table_name,
          i.relname as index_name,
          array_to_string(array_agg(a.attname), ', ') as column_names,
          ix.indrelid,
          string_to_array(ix.indkey::text, ' ')::smallint[] as indkey
      FROM pg_class i
      JOIN pg_index ix ON i.OID = ix.indrelid
      JOIN pg_class t ON ix.indrelid = t.oid
      JOIN pg_namespace ns ON ns.oid = t.relnamespace
      JOIN pg_attribute a ON a.attrelid = t.oid
      where a.attnum = ANY(ix.indkey)
      and t.relkind = 'r'
      and nspname not in ('pg_catalog')
      group by
          ns.nspname,
          t.relname,
          i.relname,
          ix.indrelid,
          ix.indkey
      order by
          ns.nspname,
          t.relname,
          i.relname,
          ix.indrelid,
          ix.indkey
    )
    SELECT
      conrelid::regclass
      ,conname
      ,reltuples::bigint
    FROM pg_constraint pgc
    JOIN pg_class ON (conrelid = pg_class.oid)
    join pg_namespace on pg_class.relnamespace = pg_namespace.oid
    and pg_namespace.nspname not in ('swrs', 'swrs_transform', 'swrs_extract')
    WHERE contype = 'f'
    AND NOT EXISTS(
      SELECT 1
      FROM indexed_tables
      WHERE indrelid = conrelid
      AND conkey = indkey
      OR (array_length(indkey, 1) > 1 AND indkey @> conkey)
    )
    ORDER BY reltuples DESC
  $$,
  'All foreign keys in the ggircs_portal & ggircs_portal_private schemas are indexed'
);

select finish();

rollback;
