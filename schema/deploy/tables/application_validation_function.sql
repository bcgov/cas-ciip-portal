-- Deploy ggircs-portal:tables/application_validation_function to pg
-- requires: schema_ggircs_portal_private

-- Deploy ggircs-portal:table_application_revision to pg
-- requires: table_application

begin;

create table ggircs_portal.application_validation_function (
  id integer primary key generated always as identity,
  validation_function_name varchar(1000) not null,
  validation_description varchar(1000) not null,
  validation_failed_message varchar(1000) not null
);

create unique index ggircs_portal_private_app_validation_function_name on ggircs_portal.application_validation_function (validation_function_name);

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'application_validation_function', 'ciip_administrator');
-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'application_validation_function', 'ciip_analyst');
-- Grant ciip_industry_user permissions
perform ggircs_portal_private.grant_permissions('select', 'application_validation_function', 'ciip_industry_user');
end
$grant$;

comment on table ggircs_portal.application_validation_function is 'Table contains data about validation functions. The validation_function_name is called in a validation function to iterate over all validation functions in this table';

comment on column ggircs_portal.application_validation_function.id is 'The generated integer primary key for this table';
comment on column ggircs_portal.application_validation_function.validation_function_name is 'The name of the validation function. This name corresponds to the name of a defined function in the database';
comment on column ggircs_portal.application_validation_function.validation_description is 'Describes what kind of validation this function does. example: total reported and total calculated emissions match';
comment on column ggircs_portal.application_validation_function.validation_failed_message is 'The message to be shown when this validation function fails';

commit;
