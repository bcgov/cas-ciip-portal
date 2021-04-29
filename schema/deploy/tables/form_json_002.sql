-- Deploy ggircs-portal:tables/form_json_002 to pg

begin;

alter table ggircs_portal.form_json add constraint form_json_slug_unique unique(slug);

commit;
