import React from 'react';
import {render, shallow} from 'enzyme';
import {FormComponent} from '../../../containers/Forms/Form';
import adminForm from '../../../../schema/data/portal/form_json/administration.json';
import emissionForm from '../../../../schema/data/portal/form_json/emission.json';
import fuelForm from '../../../../schema/data/portal/form_json/fuel.json';
import electricityAndHeatForm from '../../../../schema/data/portal/form_json/electricity_and_heat.json';
import productionForm from '../../../../schema/data/portal/form_json/production.json';

describe('Form', () => {
  it('should match the snapshot with the administration form', async () => {
    /** In node_modules/react-jsonSchema-form/lib/components/widgets/RadioWidget there is a 'var name = Math.random().toString();'
        The comment above this line says: // Generating a unique field name to identify this set of radio buttons.
        -> This is why we are patching Math.random() to return zero for this test.
    */
    Math.random = () => 0;
    const r = render(
      <FormComponent
        query={{
          ' $refType': 'Form_query',
          ' $fragmentRefs': {
            FuelFields_query: true,
            ProductionFields_query: true
          },
          result: {
            formResult: {operator: {name: 'Test operator'}},
            formJsonByFormId: {
              formJson: adminForm,
              ciipApplicationWizardByFormId: {
                formPosition: 0
              }
            }
          }
        }}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('.form-submit a').length).toBe(1);
    expect(r.find('Button').length).toBe(1);
    expect(r.find('Button').text()).toBe('Continue');
  });

  it('should match the snapshot with the fuel form', async () => {
    // TODO: figure out how to test fragment container under fuel
    const TestRenderer = () => (
      <FormComponent
        query={{
          ' $refType': 'Form_query',
          ' $fragmentRefs': {
            FuelFields_query: true,
            ProductionFields_query: true
          },
          result: {
            formResult: [
              {
                fuelType: 'C/D Waste - Plastic',
                quantity: 4,
                fuelUnits: 't',
                methodology: 'wci 1.0'
              }
            ],
            formJsonByFormId: {
              formJson: fuelForm
            }
          }
        }}
      />
    );
    // Shallow used as 'render' tries to continue farther down because of the ArrayFieldTemplate
    const r = shallow(<TestRenderer />);
    expect(r).toMatchSnapshot();
  });

  it('should match the snapshot with the emission form', async () => {
    // Shallow used as 'render' tries to continue farther down because of the ArrayFieldTemplate
    const r = render(
      <FormComponent
        query={{
          ' $refType': 'Form_query',
          ' $fragmentRefs': {
            FuelFields_query: true,
            ProductionFields_query: true
          },
          result: {
            formResult: {
              sourceTypes: [
                {
                  sourceType: 'Flaring',
                  gases: [
                    {
                      gasType: 'CH4',
                      GWP: ' x 25 = ',
                      annualCO2e: 1625,
                      annualEmission: 65,
                      gasDescription: 'gassy'
                    },
                    {
                      gasType: 'C02',
                      GWP: ' x 2 = ',
                      annualCO2e: 25,
                      annualEmission: 5,
                      gasDescription: 'not as gassy'
                    }
                  ]
                }
              ]
            },
            formJsonByFormId: {
              formJson: emissionForm,
              ciipApplicationWizardByFormId: {
                formPosition: 1
              }
            }
          }
        }}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('.form-submit a').length).toBe(1);
    expect(r.find('Button').length).toBe(2);
    expect(r.find('Button.btn-secondary').text()).toBe('Back');
  });

  it('should match the snapshot with the electricity and heat form', async () => {
    const r = render(
      <FormComponent
        query={{
          ' $refType': 'Form_query',
          ' $fragmentRefs': {
            FuelFields_query: true,
            ProductionFields_query: true
          },
          result: {
            formResult: {heat: {sold: 81}, electricity: {sold: 81}},
            formJsonByFormId: {
              formJson: electricityAndHeatForm
            }
          }
        }}
      />
    );
    expect(r).toMatchSnapshot();
  });

  it('should match the snapshot with the production form', async () => {
    // Shallow used as 'render' tries to continue farther down the product-units fragment
    const r = shallow(
      <FormComponent
        query={{
          ' $refType': 'Form_query',
          ' $fragmentRefs': {
            FuelFields_query: true,
            ProductionFields_query: true
          },
          result: {
            formResult: [
              {
                product: 'Dehydration',
                comments: 'Saepe quis aliquid e',
                quantity: 84,
                productUnits: 'kl',
                associatedEmissions: 42
              }
            ],
            formJsonByFormId: {
              formJson: productionForm
            }
          }
        }}
      />
    );
    expect(r).toMatchSnapshot();
  });
});
