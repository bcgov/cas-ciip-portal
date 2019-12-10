begin;

with rows as (
insert into ggircs_portal.benchmark(id, product_id, benchmark, eligibility_threshold, start_date, end_date)
overriding system value
values
(1, 1, 888, 999, '2019-09-17 14:49:54.191757-07', null),
(2, 2, 200, 1000,'2019-09-17 14:49:54.191757-07', null),
(3, 3, 0.0033, 0.33,'2019-09-17 14:49:54.191757-07', '2020-09-17 14:49:54.191757-07'),
(4, 3, 0.0033, 0.25,'2018-09-17 14:49:54.191757-07', '2019-09-17 14:49:54.191757-07'),
(5, 3, 0.003, 0.25,'2017-09-17 14:49:54.191757-07', '2018-09-17 14:49:54.191757-07'),
(6, 3, 0.003, 0.20, '2020-09-17 14:49:54.191757-07', '2021-09-17 14:49:54.191757-07'),
(7, 3, 0.003, 0.15,'2021-09-17 14:49:54.191757-07', null),
(8, 4, 0.024, 0.33,'2019-09-17 14:49:54.191757-07', null),
(9, 5, 0.0073, 0.33,'2019-09-17 14:49:54.191757-07', null),
(10, 6, 0.024, 0.33,'2019-09-17 14:49:54.191757-07', null),
(11, 7, 0.09, 1.174,'2019-09-17 14:49:54.191757-07', null),
(12, 8, 0.007, 0.818,'2019-09-17 14:49:54.191757-07', null),
(14, 9, 3.85, 7.5,'2019-09-17 14:49:54.191757-07', null)
on conflict(id) do update set
product_id=excluded.product_id,
benchmark=excluded.benchmark,
eligibility_threshold=excluded.eligibility_threshold,
start_date=excluded.start_date,
end_date=excluded.end_date
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.benchmark' from rows;

select setval from
setval('ggircs_portal.benchmark_id_seq', (select max(id) from ggircs_portal.benchmark), true)
where setval = 0;

commit;
