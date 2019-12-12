-- Deploy ggircs-portal:view_ciip_application to pg
-- requires: table_form_result
-- requires: table_application_status

begin;

create or replace view ggircs_portal.ciip_application as (
    select 1 from ggircs_portal.application
);
-- Postgraphile smart-comments: These comments allow Postgraphile to infer relations between views
-- as though they were tables (ie faking a primary key in order to create an ID! type)
comment on view ggircs_portal.ciip_application is E'@primaryKey id\n@foreignKey (id) references ggircs_portal.application (id)';


commit;
