-- Deploy ggircs-portal:function_create_benchmark to pg
-- requires: table_benchmark

begin;

create or replace function ggircs_portal.create_benchmark_mutation_chain(
  product_id_input int,
  benchmark_input numeric,
  eligibility_threshold_input numeric,
  incentive_multiplier_input numeric,
  start_reporting_year_input int,
  end_reporting_year_input int
)
returns ggircs_portal.benchmark
as $function$
declare
  new_id int;
  result ggircs_portal.benchmark;
begin

  --Insert new value into benchmark
  insert into ggircs_portal.benchmark(product_id, benchmark, eligibility_threshold, incentive_multiplier, start_reporting_year, end_reporting_year)
  values (product_id_input, benchmark_input, eligibility_threshold_input, incentive_multiplier_input, start_reporting_year_input, end_reporting_year_input)
  returning id into new_id;

  select id, product_id, benchmark, eligibility_threshold, incentive_multiplier, start_reporting_year, end_reporting_year from ggircs_portal.benchmark where id = new_id into result;
  return result;
end;
$function$ language plpgsql volatile;

grant execute on function ggircs_portal.create_benchmark_mutation_chain to ciip_administrator;

commit;
