-- Deploy ggircs-portal:function_create_benchmark to pg
-- requires: table_benchmark

begin;

create or replace function ggircs_portal.create_benchmark_mutation_chain(product_id_input int,  benchmark_input int, eligibility_threshold_input int,
start_date_input timestamptz, end_date_input timestamptz, prev_benchmark_id_input int)
returns ggircs_portal.benchmark
as $function$
declare
  new_id int;
  result ggircs_portal.benchmark;
begin

  --Insert new value into benchmark
  insert into ggircs_portal.benchmark(product_id, benchmark, eligibility_threshold, start_date, end_date)
  values (product_id_input, benchmark_input, eligibility_threshold_input, start_date_input, end_date_input) returning id into new_id;

  -- -- Update end date of previous benchmark if exists
  -- -- Note: Removed until decisions are made about design / constraints
  -- if prev_benchmark_id_input is not null then
  -- update ggircs_portal.benchmark
  -- set end_date = start_date_input - interval '1 day'
  -- where benchmark.id = prev_benchmark_id_input;
  -- end if;

  select id, product_id, benchmark, eligibility_threshold, start_date, end_date from ggircs_portal.benchmark where id = new_id into result;
  return result;
end;
$function$ language plpgsql volatile;

commit;
