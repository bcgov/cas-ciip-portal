-- Deploy ggircs-portal:tables/form_json_001 to pg
-- requires: tables/form_json

begin;

alter table ggircs_portal.form_json add column default_form_result jsonb;

comment on column ggircs_portal.form_json.default_form_result is 'The default_form_result column defines the shape of an empty form_result created from this form_json row';

commit;
