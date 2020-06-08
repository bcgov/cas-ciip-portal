-- Deploy ggircs-portal:computed_columns/product_linked_product to pg
-- requires: tables/linked_product

begin;

  create or replace function ggircs_portal.product_linked_product(
    input_product ggircs_portal.product
  )
    returns setof ggircs_portal.linked_product_return
    as
    $function$

    begin
        return query (
          with linked_ids as (
            select id, linked_product_id, is_deleted
            from ggircs_portal.linked_product pl
            where pl.product_id = input_product.id
          )
          select
            li.id,
            p.id as linked_product_id,
            p.product_name as product_name,
            p.product_state
            from ggircs_portal.product p
            join linked_ids li
            on p.id = li.linked_product_id
            and p.product_state = 'published'
            and li.is_deleted = 'false'
            order by li.id
        );
    end;
    $function$
      language 'plpgsql' stable;

  grant execute on function ggircs_portal.product_linked_product to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.product_linked_product is 'Computed column returns a set of linked products for a given product';

commit;
