-- Deploy ggircs-portal:data/correct_gwp_values to pg
-- requires: database_functions/correct_gwp_values

begin;

alter table ggircs_portal.form_result disable trigger _100_timestamps, disable trigger _immutable_form_result;

select ggircs_portal_private.correct_gwp_values();

alter table ggircs_portal.form_result enable trigger _100_timestamps, enable trigger _immutable_form_result;

commit;
