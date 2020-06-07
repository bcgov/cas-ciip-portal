-- Deploy ggircs-portal:computed_columns/product_product_link to pg
-- requires: tables/product_link

begin;

  create or replace function ggircs_portal.product_product_link(
    input_product ggircs_portal.product
  )
    returns setof ggircs_portal.product
    as
    $function$

    begin
        return query (
          with linked_ids as (
            select id, linked_product_id, is_deleted
            from ggircs_portal.product_link pl
            where pl.product_id = input_product.id
          )
          select p.* from ggircs_portal.product p
            join linked_ids li
            on p.id = li.linked_product_id
            and p.product_state = 'published'
            and li.is_deleted = 'false'
            order by li.id
        );
    end;
    $function$
      language 'plpgsql' stable;

  grant execute on function ggircs_portal.product_product_link to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.product_product_link is 'Computed column returns a set of linked products for a given product';

commit;
