-- Deploy ggircs-portal:view_ciip_certifier to pg
-- requires: table_form_result

begin;

create view ggircs_portal.ciip_certifier as (
  with x as (
    select
      cast(id as text) as id,
      json_array_elements((form_result -> 'certifiying_official')::json) as certifier_data
    from ggircs_portal.form_result
  )
  select
     x.id as application_id,
     x.certifier_data ->> 'fax' as fax,
     x.certifier_data ->> 'phone' as phone,
     x.certifier_data ->> 'position' as position,
     x.certifier_data ->> 'last_name' as last_name,
     x.certifier_data ->> 'first_name' as first_name,
     x.certifier_data ->> 'email_address' as email_address,
     x.certifier_data ->> 'certifier_name' as certifier_name,
     (x.certifier_data ->> 'date')::date as certification_date
     -- add certifier address to address view
  from x
);

comment on view ggircs_portal.ciip_certifier is 'the view for certifier data reported in the application';
comment on column ggircs_portal.ciip_certifier.application_id is 'the application id used for reference and join';
comment on column ggircs_portal.ciip_certifier.fax is 'the certifier fax';
comment on column ggircs_portal.ciip_certifier.phone is 'the certifier phone';
comment on column ggircs_portal.ciip_certifier.position is 'the certifier position';
comment on column ggircs_portal.ciip_certifier.last_name is 'the last name of the certifier';
comment on column ggircs_portal.ciip_certifier.first_name is 'the first name of the certifier';
comment on column ggircs_portal.ciip_certifier.email_address is 'the email address of the certifier';

commit;
