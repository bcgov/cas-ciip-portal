import React from 'react';
import {QueryRenderer, graphql} from 'react-relay';
import {createMockEnvironment, MockPayloadGenerator} from 'relay-test-utils';
import {FormTestQuery} from 'FormTestQuery.graphql';
import {create} from 'react-test-renderer';
import jsf from 'json-schema-faker';
import {mockRandom} from 'jest-mock-random';
import Form from '../../../containers/Forms/Form';
import adminForm from '../../../../schema/data/portal/form_json/administration.json';
import emissionForm from '../../../../schema/data/portal/form_json/emission.json';
import fuelForm from '../../../../schema/data/portal/form_json/fuel.json';
import electricityAndHeatForm from '../../../../schema/data/portal/form_json/electricity_and_heat.json';
import productionForm from '../../../../schema/data/portal/form_json/production.json';

jsf.option({alwaysFakeOptionals: true});
jsf.format('duns', () => jsf.random.randexp('^\\d{9}$'));
jsf.format('postal-code', () =>
  jsf.random.randexp('[A-Z][0-9][A-Z] [0-9][A-Z][0-9]')
);

describe('Form', () => {
  beforeEach(() => {
    // Mock Math.random() to be deterministic.
    // This is needed by react-jsonschema-form's RadioWidget and by json-schema-faker
    mockRandom([0.1, 0.2, 0.3, 0.4, 0.5]);
    jsf.option({random: Math.random}); // Use the mocked random
  });

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
              formResult: jsf.generate(adminForm.schema),
              formJsonByFormId: {
                name: 'Admin',
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
              formResult: jsf.generate(fuelForm.schema),
              formJsonByFormId: {
                name: 'Fuel',
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
              formResult: jsf.generate(emissionForm.schema),
              formJsonByFormId: {
                name: 'Emission',
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
              formResult: jsf.generate(electricityAndHeatForm.schema),
              formJsonByFormId: {
                name: 'Electricity And Heat',
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
              formResult: jsf.generate(productionForm.schema),
              formJsonByFormId: {
                name: 'Production',
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
