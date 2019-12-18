-- Deploy ggircs-portal:function_search_products to pg
-- requires: table_product

begin;

create or replace function ggircs_portal.search_products(search_field text, search_value text, order_by_field text, direction text)

returns setof ggircs_portal.product as
        $function$
            begin
                     if search_field is null or search_value is null
                        then return query execute 'with outerTable as (select p.*, benchmark, eligibility_threshold, start_date, end_date from ggircs_portal.product as p left join ggircs_portal.benchmark as b on p.id = b.product_id),
                        tempTable as (select id, name, description, units, state, parent, product_form_id, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by from outerTable
                        where state != ''deprecated'' and (CURRENT_TIMESTAMP between start_date and end_date or (CURRENT_TIMESTAMP > start_date and end_date is null) or benchmark is null)
                        order by ' || order_by_field || ' ' || direction ||  ')
                        select * from tempTable';
                    else
                    return query execute
                    'with outerTable as (select p.*, benchmark, eligibility_threshold, start_date, end_date from ggircs_portal.product as p left join ggircs_portal.benchmark as b on p.id = b.product_id),
                        tempTable as (select id, name, description, units, state, parent, product_form_id, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by from outerTable
                        where state != ''deprecated'' and '|| search_field || '::text ilike ''%' || search_value || '%'' and state != ''deprecated''
                        and (  CURRENT_TIMESTAMP between start_date and end_date or (CURRENT_TIMESTAMP > start_date and end_date is null) or benchmark is null)
                        order by '|| order_by_field || ' ' || direction || ')
                        select * from tempTable';
                end if;
            end
        $function$ language plpgsql stable;

commit;
