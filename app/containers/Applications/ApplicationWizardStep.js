import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import Form from '../Forms/Form';

/*
 * The ApplicationWizardStep renders a form and, where applicable,
 * (TODO) starts by presenting a summary of existing data to the user
 */
const ApplicationWizardStep = ({
  query,
  formId,
  onStepComplete,
  prepopulateFromCiip,
  prepopulateFromSwrs
}) => {
  let initialData;
  if (formId === 1)
    initialData = {
      facility_information: [
        {
          bcghgid: 17,
          latitude: 70,
          longitude: 68,
          naics_code: 45,
          nearest_city: 'Eligendi animi faci',
          facility_name: 'Non esse labore nece',
          facility_type: 'EIO',
          facility_description: 'Ipsa ut alias volup',
          mailing_address_city: 'Ut provident veniam',
          mailing_address_line_1: 'Consectetur repudia',
          mailing_address_province: 'Ontario'
        }
      ],
      reporting_operation_information: [
        {
          naics_code: 7,
          duns_number: 2,
          operator_name: 'Aut irure maxime ut ',
          operator_trade_name: 'Deleniti magnam id i',
          mailing_address_city: 'Ad commodo dolore ul',
          mailing_address_line_1: 'Ipsam alias pariatur',
          mailing_address_country: 'Dicta sequi eos arc',
          mailing_address_province: 'Saskatchewan',
          bc_corporate_registry_number: 30
        }
      ],
      operational_representative_information: [
        {
          fax: '+1 (261) 404-7797',
          phone: '+1 (459) 161-6215',
          position: 'Voluptates voluptate',
          last_name: 'Ipsam ut eum reprehe',
          first_name: 'Voluptatem Illum a',
          email_address: 'ryjym@mailinator.com',
          mailing_address_city: 'Accusantium fuga En',
          mailing_address_line_1: 'Ad non non tempor do',
          mailing_address_province: 'Saskatchewan'
        }
      ]
    };

  let initialDataSource;
  if (prepopulateFromCiip) {
    initialDataSource = 'the CIIP application you submitted last year';
  } else if (prepopulateFromSwrs) {
    initialDataSource = 'your last SWRS report';
  }

  return (
    <Form
      query={query}
      formId={formId}
      startsEditable={!prepopulateFromSwrs && !prepopulateFromCiip}
      initialData={initialData}
      initialDataSource={initialDataSource}
      onFormComplete={onStepComplete}
    />
  );
};

export default createFragmentContainer(ApplicationWizardStep, {
  query: graphql`
    fragment ApplicationWizardStep_query on Query
      @argumentDefinitions(formCondition: {type: "FormJsonCondition"}) {
      ...Form_query @arguments(condition: $formCondition)
    }
  `
});
