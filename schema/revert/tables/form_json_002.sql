-- Revert ggircs-portal:tables/form_json_002 from pg

begin;

alter table ggircs_portal.form_json drop constraint form_json_slug_unique;

drop;
