-- Deploy ggircs-portal:types/review_step_name_name to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.review_step (
  id integer primary key generated always as identity,
  step_name varchar unique not null,
  is_active boolean not null default true
);

do
$grant$
begin
-- Grant ciip_administrator permissions
perform ggircs_portal_private.grant_permissions('select', 'review_step', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('insert', 'review_step', 'ciip_administrator');
perform ggircs_portal_private.grant_permissions('update', 'review_step', 'ciip_administrator');

-- Grant ciip_analyst permissions
perform ggircs_portal_private.grant_permissions('select', 'review_step', 'ciip_analyst');

end
$grant$;

-- Enable row-level security
alter table ggircs_portal.review_step enable row level security;

comment on table ggircs_portal.review_step is 'Table contains a unique step_name and a boolean is_active column to indicate if the step_name is currently in use when reviewing an application';
comment on column ggircs_portal.review_step.step_name is 'Unique step_name to be included in during an application review';
comment on column ggircs_portal.review_step.is_active is 'Boolean value indicates if the step is currently in use when reviewing an application';

commit;
