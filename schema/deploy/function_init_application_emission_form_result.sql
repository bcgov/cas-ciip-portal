-- Deploy ggircs-portal:function_init_application_emission_form_result to pg

begin;

create or replace function ggircs_portal.init_application_emission_form_result(facility_id int, reporting_year varchar(1000))
returns jsonb
as $function$
declare
  swrs_facility_id int;
  emission_datum text;
  result text;
  first_fuel boolean;
  emission_category_var text;
begin
  select facility.swrs_facility_id from ggircs_portal.facility where id = facility_id into swrs_facility_id;

  result := $$
    {
      "sourceTypes": [
  $$;

  first_fuel := true;
  for emission_datum in (
      select distinct emission_category from ggircs_portal.emission_category_gas
  )
  loop
    emission_category_var := emission_datum;
    if first_fuel = false then
      result := concat(result, ',');
    end if;
    first_fuel := false;
    result := concat(result,
      (
        -- CTE that returns the emission qty and calc_qty for each emission category by gas type
        -- for a given facility and a reporting year
         with x as (
            select
             map.emission_category as emissionCategory,
             map.gas_type as gasType,
             e.quantity as qty,
             e.calculated_quantity as cqty,
             map.gwp as map_gwp,
             map.gas_description as gas_description
             from ggircs_portal.get_swrs_emission_data(48166, '2018') as e
             right join
              (
                select
                 ecg.emission_category,
                 g.gas_type,
                 g.gas_description,
                 g.gwp
                 from ggircs_portal.emission_category_gas ecg
                inner join ggircs_portal.gas g on ecg.gas_id = g.id
              ) as map
             on e.emission_category = map.emission_category and e.gas_type = map.gas_type
         )
         select row_to_json(t)
         from (
            select emissionCategory as "sourceTypeName",
              (
                select array_to_json(array_agg(row_to_json(d)))
                from (
                  select
                    gasType as "gasType",
                    qty as "quantity",
                    cqty as "calculatedQuantity",
                    map_gwp as "gwp",
                    gas_description as "gasDescription"
                  from x
                  where x.emissionCategory = emission_category_var
                ) d
              ) as gases
            from x
            where x.emissionCategory = emission_category_var
            limit 1
         ) t
      )
    );
  end loop;
  result := concat(result, ']}');
  return result;

end;
$function$ language plpgsql strict volatile;

commit;

/*
select * from ggircs_portal.init_application_fuel_form_result(1, '2018');
select * from ggircs_portal.init_application_emission_form_result(1, '2018');
*/
