-- Deploy ggircs-portal:tables/emission_factor to pg

begin;

create table swrs.emission_factor (

    id                                  integer primary key,
    fuel_id                             integer references swrs.fuel(id),
    eccc_xml_file_id                      integer,
    activity_name                       varchar(1000),
    sub_activity_name                   varchar(1000),
    emission_factor_type                varchar(1000),
    default_or_measured                 varchar(1000),
    emission_factor_amount     numeric,
    emission_factor_gas        varchar(1000),
    emission_factor_unit_type  varchar(1000)
);

create index ggircs_emission_factor_fuel_foreign_key on swrs.emission_factor(fuel_id);

comment on table swrs.emission_factor is 'The table containing the information on fuels';
comment on column swrs.emission_factor.id is 'The primary key';
comment on column swrs.emission_factor.fuel_id is 'A foreign key reference to swrs.fuel';
comment on column swrs.emission_factor.eccc_xml_file_id is 'A foreign key reference to swrs.eccc_xml_file';
comment on column swrs.emission_factor.activity_name is 'The name of the activity (partial fk reference)';
comment on column swrs.emission_factor.sub_activity_name is 'The name of the sub_activity (partial fk reference)';
comment on column swrs.emission_factor.emission_factor_type is 'The type derived from the metadata on the EmissionFactors xml tag';
comment on column swrs.emission_factor.default_or_measured is 'The indication of whether the factor is a default or measured, derived from the data in the EmissionFactorDefaultOrMeasured tag';
comment on column swrs.emission_factor.emission_factor_amount is 'The amount of the measured_emission';
comment on column swrs.emission_factor.emission_factor_gas is 'The gas type of the measured_emission';
comment on column swrs.emission_factor.emission_factor_unit_type is 'The unit type of the measured_emission';
comment on column swrs.emission_factor.emission_factor_unit_type is 'The measured emission factor unit type of the fuel';

commit;
