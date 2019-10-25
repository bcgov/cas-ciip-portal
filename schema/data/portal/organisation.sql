begin;

insert into ggircs_portal.organisation (
  id,
  report_id,
  swrs_report_id,
  swrs_organisation_id,
  reporting_year,
  operator_name,
  operator_trade_name,
  duns,
  cra_business_number,
  operator_mailing_address,
  operator_city,
  operator_province,
  operator_postal_code,
  operator_country
)
overriding system value
values (
  1,
  1,
  2208,
  4114,
  '2018',
  'R. Butus, Ltd.',
  'R. Butus',
  '229937112',
  '927993196',
  '7326, Evergreen Street Northwest',
  'Oak Grove',
  'British Columbia',
  'V1C6T8',
  'Canada'
),
(
  2,
  2,
  4321,
  '2018',
  'Hogwarts School of Witchcraft and Wizardry',
  'Hogwarts',
  '1234567689',
  '987654321',
  '5423, Scrimgeour Lane',
  'Godric''s Hollow',
  'British Columbia',
  'V0L2M0',
  'Canada'
)
on conflict(id) do update
set
report_id=excluded.report_id,
swrs_report_id=excluded.swrs_report_id,
swrs_organisation_id=excluded.swrs_organisation_id,
reporting_year=excluded.reporting_year,
operator_name=excluded.operator_name,
operator_trade_name=excluded.operator_trade_name,
duns=excluded.duns,
cra_business_number=excluded.cra_business_number,
operator_mailing_address=excluded.operator_mailing_address,
operator_city=excluded.operator_city,
operator_province=excluded.operator_province,
operator_postal_code=excluded.operator_postal_code,
operator_country=excluded.operator_country;

commit;
