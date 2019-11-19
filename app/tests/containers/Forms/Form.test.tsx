import React from 'react';
import {QueryRenderer, graphql} from 'react-relay';
import {createMockEnvironment, MockPayloadGenerator} from 'relay-test-utils';
import {FormTestQuery} from 'FormTestQuery.graphql';
import {create} from 'react-test-renderer';
import Form from '../../../containers/Forms/Form';
import adminForm from '../../../../schema/data/portal/form_json/administration.json';
import emissionForm from '../../../../schema/data/portal/form_json/emission.json';
import fuelForm from '../../../../schema/data/portal/form_json/fuel.json';
import electricityAndHeatForm from '../../../../schema/data/portal/form_json/electricity_and_heat.json';
import productionForm from '../../../../schema/data/portal/form_json/production.json';

describe('Form', () => {
  /** In node_modules/react-jsonSchema-form/lib/components/widgets/RadioWidget there is a 'var name = Math.random().toString();'
        The comment above this line says: // Generating a unique field name to identify this set of radio buttons.
        -> This is why we are patching Math.random() to return zero for this test.
    */
  Math.random = () => 0;

  const environment = createMockEnvironment();
  const TestRenderer = () => (
    <QueryRenderer<FormTestQuery>
      environment={environment}
      query={graphql`
        query FormTestQuery($formResultId: ID!) @relay_test_operation {
          query {
            ...Form_query @arguments(formResultId: $formResultId)
          }
        }
      `}
      variables={{formResultId: 'test-id'}}
      render={({error, props}) => {
        if (props) {
          return <Form query={props.query} />;
        }

        if (error) {
          return error.message;
        }

        return 'Loading...';
      }}
    />
  );

  it('should match the snapshot with the administration form', async () => {
    const renderer = create(<TestRenderer />);
    environment.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, {
        Query() {
          return {
            result: {
              formResult: {operator: {name: 'TestOperator'}},
              formJsonByFormId: {
                formJson: adminForm
              }
            }
          };
        }
      })
    );
    expect(renderer).toMatchSnapshot();
  });

  it('should match the snapshot with the fuel form', async () => {
    const renderer = create(<TestRenderer />);
    environment.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, {
        Query() {
          return {
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
            },
            allFuels: {
              edges: [
                {
                  node: {
                    name: 'C/D Waste - Plastic',
                    units: 't'
                  }
                },
                {node: {name: 'Diesel', units: 'kL'}}
              ]
            }
          };
        }
      })
    );
    expect(renderer).toMatchSnapshot();
  });

  it('should match the snapshot with the emission form', async () => {
    const renderer = create(<TestRenderer />);
    environment.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, {
        Query() {
          return {
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
                formJson: emissionForm
              }
            }
          };
        }
      })
    );
    expect(renderer).toMatchSnapshot();
  });

  it('should match the snapshot with the electricity and heat form', async () => {
    const renderer = create(<TestRenderer />);
    environment.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, {
        Query() {
          return {
            result: {
              formResult: {heat: {sold: 81}, electricity: {sold: 81}},
              formJsonByFormId: {
                formJson: electricityAndHeatForm
              }
            }
          };
        }
      })
    );
    expect(renderer).toMatchSnapshot();
  });

  it('should match the snapshot with the production form', async () => {
    const renderer = create(<TestRenderer />);
    environment.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, {
        Query() {
          return {
            result: {
              formResult: [
                {
                  product: 'Dehydration',
                  comments: 'Saepe quis aliquid e',
                  quantity: 84,
                  productUnits: 'kL',
                  associatedEmissions: 42
                }
              ],
              formJsonByFormId: {
                formJson: productionForm
              },
              allProducts: {
                edges: [
                  {
                    node: {
                      name: 'Dehydration',
                      units: 'kL'
                    }
                  },
                  {node: {name: 'Potatoes', units: 't'}}
                ]
              }
            }
          };
        }
      })
    );
    expect(renderer).toMatchSnapshot();
  });
});
