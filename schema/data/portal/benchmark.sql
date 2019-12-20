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
(1, 1, 0.24, 0.48, 1, 2019, 2023),
(2, 2, 888, 999, 1, 2019, 2023),
(3, 3, 888, 999, 0.2, 2019, 2023),
(4, 4, 0.09, 0.45, 1, 2019, 2023),
(5, 5, 42, 84, 1, 2019, 2023),
(6, 6, 42, 84, 1, 2019, 2023),
(7, 7, 42, 84, 1, 2019, 2023),
(8, 8, 42, 84, 1, 2019, 2023),
(9, 9, 0.01757, 0.31794, 1, 2019, 2023),
(10, 10, 0.04877, 0.46132, 1, 2019, 2023),
(11, 11, 0.01757, 0.31794, 1, 2019, 2023),
(12, 12, 0.01757, 0.31794, 1, 2019, 2023),
(13, 13, 0.2, 0.4, 1, 2019, 2023),
(14, 14, 0.2, 0.52, 1, 2019, 2023),
(15, 15, 0.2, 0.56, 1, 2019, 2023),
(16, 16, 0.86, 2.02, 1, 2019, 2023),
(17, 17, 0.766, 7, 1, 2019, 2023),
(18, 18, 0.954, 2.37, 1, 2019, 2023),
(19, 19, 0.106, 2.37, 1, 2019, 2023),
(20, 20, 0.5, 1, 1, 2019, 2023),
(21, 21, 0.00171, 0.076, 1, 2019, 2023),
(22, 22, 0.127, 0.193, 1, 2019, 2023),
(23, 23, 0.82, 1.88, 1, 2019, 2023),
(24, 24, 0.08035, 0.26, 1, 2019, 2023),
(25, 25, 0.08442, 0.36, 1, 2019, 2023),
(26, 26, 2.17, 3.76, 1, 2019, 2023),
(27, 27, 0.056, 0.132, 1, 2019, 2023),
(28, 28, 0.11, 0.20, 1, 2019, 2023),
(29, 29, 0.007, 0.818, 1, 2019, 2023),
(30, 30, 0.09, 1.174, 1, 2019, 2023),
(31, 31, 3.12, 59.10, 1, 2019, 2023),
(32, 32, 0.88, 1.31, 1, 2019, 2023),
(33, 33, 1.19, 4.03, 1, 2019, 2023),
(34, 34, 0.0033, 0.330, 1, 2019, 2023),
(35, 35, 0.024, 0.330, 1, 2019, 2023),
(36, 36, 0.024, 0.330, 1, 2019, 2023),
(37, 37, 0.0073, 0.330, 1, 2019, 2023),
(38, 38, 0.024, 0.330, 1, 2019, 2023),
(39, 39, 3.85, 7.5, 1, 2019, 2023)
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
