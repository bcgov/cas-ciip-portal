begin;

with rows as (
insert into ggircs_portal.benchmark(
  id,
  product_id,
  benchmark,
  eligibility_threshold,
  incentive_multiplier,
  start_reporting_year,
  end_reporting_year
)
overriding system value
values
(1, 1, 0.24, 0.48, 1, 2018, 2022),
(2, 2, 888, 999, 1, 2018, 2022),
(3, 3, 888, 999, 0.2, 2018, 2022),
(4, 4, 0.09, 0.45, 1, 2018, 2022),
(5, 5, 42, 84, 1, 2018, 2022),
(6, 6, 42, 84, 1, 2018, 2022),
(7, 7, 42, 84, 1, 2018, 2022),
(8, 8, 42, 84, 1, 2018, 2022),
(9, 9, 0.01757, 0.31794, 1, 2018, 2022),
(10, 10, 0.04877, 0.46132, 1, 2018, 2022),
(11, 11, 0.01757, 0.31794, 1, 2018, 2022),
(12, 12, 0.01757, 0.31794, 1, 2018, 2022),
(13, 13, 0.2, 0.4, 1, 2018, 2022),
(14, 14, 0.2, 0.52, 1, 2018, 2022),
(15, 15, 0.2, 0.56, 1, 2018, 2022),
(16, 16, 0.86, 2.02, 1, 2018, 2022),
(17, 17, 0.766, 7, 1, 2018, 2022),
(18, 18, 0.954, 2.37, 1, 2018, 2022),
(19, 19, 0.106, 2.37, 1, 2018, 2022),
(20, 20, 0.5, 1, 1, 2018, 2022),
(21, 21, 0.00171, 0.076, 1, 2018, 2022),
(22, 22, 0.127, 0.193, 1, 2018, 2022),
(23, 23, 0.82, 1.88, 1, 2018, 2022),
(24, 24, 0.08035, 0.26, 1, 2018, 2022),
(25, 25, 0.08442, 0.36, 1, 2018, 2022),
(26, 26, 2.17, 3.76, 1, 2018, 2022),
(27, 27, 0.056, 0.132, 1, 2018, 2022),
(28, 28, 0.11, 0.20, 1, 2018, 2022),
(29, 29, 0.007, 0.818, 1, 2018, 2022),
(30, 30, 0.09, 1.174, 1, 2018, 2022),
(31, 31, 3.12, 59.10, 1, 2018, 2022),
(32, 32, 0.88, 1.31, 1, 2018, 2022),
(33, 33, 1.19, 4.03, 1, 2018, 2022),
(34, 34, 0.0033, 0.330, 1, 2018, 2022),
(35, 35, 0.024, 0.330, 1, 2018, 2022),
(36, 36, 0.024, 0.330, 1, 2018, 2022),
(37, 37, 0.0073, 0.330, 1, 2018, 2022),
(38, 38, 0.024, 0.330, 1, 2018, 2022),
(39, 39, 3.85, 7.5, 1, 2018, 2022)
on conflict(id) do update set
product_id=excluded.product_id,
benchmark=excluded.benchmark,
eligibility_threshold=excluded.eligibility_threshold,
incentive_multiplier=excluded.incentive_multiplier,
start_reporting_year=excluded.start_reporting_year,
end_reporting_year=excluded.end_reporting_year
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.benchmark' from rows;

select setval from
setval('ggircs_portal.benchmark_id_seq', (select max(id) from ggircs_portal.benchmark), true)
where setval = 0;

commit;
