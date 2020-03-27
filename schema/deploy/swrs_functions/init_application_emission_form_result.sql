-- Deploy ggircs-portal:function_init_application_emission_form_result to pg

begin;

create or replace function ggircs_portal.init_application_emission_form_result(facility_id int, reporting_year integer)
returns jsonb
as $function$
declare
  swrs_facility_id int;
  emission_datum text;
  result text;
  first_source_type boolean;
  emission_category_var text;
begin
  select facility.swrs_facility_id from ggircs_portal.facility where id = facility_id into swrs_facility_id;

  result := $$
    {
      "sourceTypes": [
  $$;

  first_source_type := true;
  for emission_datum in (
    with categories as (
        select distinct on (swrs_emission_category) swrs_emission_category, id
        from ggircs_portal.emission_category
    )
    select emission_category from categories order by id
  )
  loop
    emission_category_var := emission_datum;
    if first_source_type = false then
      result := concat(result, ',');
    end if;
    first_source_type := false;
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
            map.gas_description as gas_description,
            map.id
            from ggircs_portal.get_swrs_emission_data(swrs_facility_id, reporting_year) as e
            right join
            (
              select
                ecg.id,
                ecg.emission_category,
                g.gas_type,
                g.gas_description,
                g.gwp
                from ggircs_portal.emission_category_gas ecg
              inner join ggircs_portal.gas g on ecg.gas_id = g.id
            ) as map
            on e.emission_category = map.emission_category and e.gas_type = map.gas_type
            order by map.id
         )
         select row_to_json(t)
         from (
            select emissionCategory as "sourceTypeName",
              (
                select array_to_json(array_agg(row_to_json(d)))
                from (
                  select
                    gasType as "gasType",
                    qty as "annualEmission",
                    cqty as "annualCO2e",
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

grant execute on function ggircs_portal.init_application_emission_form_result to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
