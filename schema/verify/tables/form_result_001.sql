-- Verify ggircs-portal:tables/form_result_001 on pg

begin;

select exists (select tgname
from pg_trigger
where not tgisinternal
and tgrelid = 'ggircs_portal.form_result'::regclass
and tgname = '_immutable_form_result');

rollback;
