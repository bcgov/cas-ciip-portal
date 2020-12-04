-- Deploy ggircs-portal:tables/form_result_001 to pg
-- requires: tables/form_result
-- requires: trigger_functions/immutable_form_result

begin;

create trigger _immutable_form_result
  before insert or update of form_result
  on ggircs_portal.form_result
  for each row
  execute procedure ggircs_portal_private.immutable_form_result();

commit;
