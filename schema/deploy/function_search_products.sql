-- Deploy ggircs-portal:function_search_products to pg
-- requires: table_product

begin;

create or replace function ggircs_portal.search_products(search_field text, search_value text, order_by_field text, direction text)

returns setof ggircs_portal.product as
        $function$
            begin
                     if search_field is null or search_value is null
                        then return query execute 'with tempTable as (select p.* from ggircs_portal.product as p join ggircs_portal.benchmark as b on p.id = b.product_id
                        and p.state != ''deprecated'' and (CURRENT_TIMESTAMP between start_date and end_date or (CURRENT_TIMESTAMP > start_date and end_date is null)) order by ' || order_by_field || ' ' || direction ||  ')
                        select * from tempTable';
                    else
                    return query execute
                        'with tempTable as (select p.* from ggircs_portal.product as p join ggircs_portal.benchmark as b on p.id = b.product_id
                        and '|| search_field || '::text ilike ''%' || search_value || '%'' and state != ''deprecated'' and (CURRENT_TIMESTAMP between start_date and end_date or (CURRENT_TIMESTAMP > start_date and end_date is null))
                        order by '|| order_by_field || ' ' || direction || ')
                        select * from tempTable';
                end if;
            end
        $function$ language plpgsql stable;

commit;
