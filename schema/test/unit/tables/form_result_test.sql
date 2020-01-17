set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(1);

select has_table(
    'ggircs_portal', 'form_result',
    'ggircs_portal.form_result should exist, and be a table'
);

select finish();
rollback;
