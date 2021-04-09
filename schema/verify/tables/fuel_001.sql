-- Verify ggircs-portal:tables/fuel_001 on pg

BEGIN;

select column_name, data_type from information_schema.columns
where table_schema='ggircs_portal'
and table_name='fuel'
and column_name='comments'
and data_type='character varying';

ROLLBACK;
