-- Deploy ggircs-portal:view_ciip_contact to pg
-- requires: table_form_result

BEGIN;
  create view ggircs_portal.ciip_contact as (
    with x as (
      select
        cast(id as text) as id,
        json_array_elements((form_result -> 'operational_representative_information')::json) as contact_data
      from ggircs_portal.form_result
    )
    select
       x.id as application_id,
       x.contact_data ->> 'fax' as fax,
       x.contact_data ->> 'phone' as phone,
       x.contact_data ->> 'position' as position,
       x.contact_data ->> 'last_name' as last_name,
       x.contact_data ->> 'first_name' as first_name,
       x.contact_data ->> 'email_address' as email_address
       -- add contact address to address view
    from x
 );

comment on view ggircs_portal.ciip_contact is 'The view for contact data reported in the application';
comment on column ggircs_portal.ciip_contact.application_id is 'The application id used for reference and join';
comment on column ggircs_portal.ciip_contact.fax is 'The contact fax';
comment on column ggircs_portal.ciip_contact.phone is 'The contact phone';
comment on column ggircs_portal.ciip_contact.position is 'The contact position';
comment on column ggircs_portal.ciip_contact.last_name is 'The last name of the contact';
comment on column ggircs_portal.ciip_contact.first_name is 'The first name of the contact';
comment on column ggircs_portal.ciip_contact.email_address is 'The email address of the contact';
COMMIT;
