/**
  This dummy data creation file creates relates products to naics_codes.
  No products can be selected by a reporter without first adding data to the product_naics_code table
*/

begin;

  select 'Dropping old product_naics_code data: ';
  truncate ggircs_portal.product_naics_code restart identity cascade;
  with rows as (
    insert into ggircs_portal.product_naics_code(product_id, naics_code_id, is_mandatory)
    values
    (1,1, false), (1,3, false),
    (2,1, false), (2,3, false),
    (3,1, false), (3,2, true),
    (4,1, false), (4,3, false),
    (5,1, false), (5,3, false),
    (6,1, false), (6,3, false),
    (7,1, false), (7,3, false),
    (8,1, false), (8,3, false),
    (9,1, true),
    (10,3, false),
    (11,2, false), (25,2, false), (26,2, false), (36,2, false)

  returning 1
  ) select 'Inserted ' || count(*) || ' rows into ggircs_portal.product_naics_code' from rows;

commit;
