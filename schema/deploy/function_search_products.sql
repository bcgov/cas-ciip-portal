-- Deploy ggircs-portal:function_search_products to pg
-- requires: table_product

begin;

create or replace function ggircs_portal.search_products(search_field text, search_value text, order_by_field text, direction text)

returns setof ggircs_portal.product as
        $function$
            begin
                     if search_field is null or search_value is null
                        then return query execute 'select * from ggircs_portal.product where state != ''deprecated'' order by ' || order_by_field || ' ' || direction;
                    else
                        return query execute 'select * from ggircs_portal.product where '|| search_field || '::text ilike ''%' || search_value || '%'' and state != ''deprecated'' order by '|| order_by_field || ' ' || direction;
                end if;
            end
        $function$ language plpgsql stable;

commit;
