-- Deploy ggircs-portal:types/application_revision_validation_result to pg
-- requires: schema_ggircs_portal_private

begin;

create type ggircs_portal.application_revision_validation_result as (
  validation_description varchar(1000),
  validation_failed_message varchar(1000),
  is_ok boolean
);

comment on type ggircs_portal.application_revision_validation_result is 'Generic return type for all application validation functions described in the application_revision_validation_function table';

commit;
