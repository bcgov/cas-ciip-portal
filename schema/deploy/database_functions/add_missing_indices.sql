-- Deploy ggircs-portal:database_functions/add_missing_indices to pg

begin;

/** Missing indices on created_at, updated_at, deleted_at fkey columns can be fixed with the upsert_timestamp_columns function **/
do $$
  declare
    table_names text[] :=
    ARRAY['fuel', 'form_result', 'application_revision_status', 'emission_category', 'emission_category_gas',
     'certification_url', 'linked_product', 'form_json', 'gas', 'review_comment', 'ciip_user',
     'product', 'benchmark', 'application_revision'];
    schema_name text = 'ggircs_portal';
  begin
    for i in 1 .. array_upper(table_names, 1)
    loop
      execute format('select ggircs_portal_private.upsert_timestamp_columns(
        table_schema_name := ' || quote_literal(schema_name) ||',
        table_name := %s,
        add_create := true,
        add_update := true,
        add_delete := true)', quote_literal(table_names[i]));
    end loop;
  end
$$;

/** Other missing indices **/

-- application
create index if not exists application_facility_id_idx
  on ggircs_portal.application(facility_id);
create index if not exists application_reporting_year_idx
  on ggircs_portal.application(reporting_year);

-- benchmark
create index if not exists benchmark_product_id_idx
  on ggircs_portal.benchmark(product_id);
create index if not exists benchmark_start_reporting_year_idx
  on ggircs_portal.benchmark(start_reporting_year);
create index if not exists benchmark_end_reporting_year_idx
  on ggircs_portal.benchmark(end_reporting_year);

-- certification_url
create index if not exists certification_url_app_id_idx
  on ggircs_portal.certification_url(application_id);
create index if not exists certification_url_app_id_version_idx
  on ggircs_portal.certification_url(application_id, version_number);
create index if not exists certification_url_certified_by_idx
  on ggircs_portal.certification_url(certified_by);

-- ciip_user_organisation
create index if not exists ciip_user_organisation_user_id_idx
  on ggircs_portal.ciip_user_organisation(user_id);
create index if not exists ciip_user_organisation_org_id_idx
  on ggircs_portal.ciip_user_organisation(organisation_id);

-- emission_category_gas
create index if not exists emission_cat_gas_emission_cat_id_idx
  on ggircs_portal.emission_category_gas(emission_category_id);
create index if not exists emission_cat_gas_gas_id_idx
  on ggircs_portal.emission_category_gas(gas_id);

-- form_result
create index if not exists form_result_app_id_idx
  on ggircs_portal.form_result(application_id);
create index if not exists form_result_form_id_idx
  on ggircs_portal.form_result(form_id);

-- linked_product
create index if not exists linked_product_product_id_idx
  on ggircs_portal.linked_product(product_id);
create index if not exists linked_product_linked_product_id_idx
  on ggircs_portal.linked_product(linked_product_id);

commit;
