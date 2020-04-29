import React from 'react';
import {QueryRenderer, graphql} from 'react-relay';
import {createMockEnvironment, MockPayloadGenerator} from 'relay-test-utils';
import {FormTestQuery} from 'FormTestQuery.graphql';
import {create} from 'react-test-renderer';
import {mockRandom} from 'jest-mock-random';
import Form from 'containers/Forms/Form';
import adminForm from 'schema/data/prod/form_json/administration.json';
import emissionForm from 'schema/data/prod/form_json/emission.json';
import fuelForm from 'schema/data/prod/form_json/fuel.json';
import productionForm from 'schema/data/prod/form_json/production.json';
import {FormJson} from 'next-env';
import {generateFakeSchemaData} from 'tests/integration/json-schema-utils';
import MockRouter from 'tests/integration/MockRouter';

// Product & Fuel were not rendering anything (because we mess with the schema in ProductRowIdField & those values are not making it in)
// This mock allows the data to show up (with the name of the product or fuel as 'one')
jest.mock('components/SearchDropdown', () => {
  return {
    __esModule: true,
    default: () => {
      return 'one';
    }
  };
});

// Todo: Mock so that the entire flow works properly

// jest.mock('components/Forms/SearchDropdownWidget', () => ({onChange,
//   schema,
//   id,
//   placeholder,
//   value}) => {return <mock-SearchDropdownWidget schema={{...schema, enums: [1,2], enumNames: ['one', 'two'], state: ['active', 'active']}} />}
// );
describe('Form', () => {
  beforeEach(() => {
    // Mock Math.random() to be deterministic.
    // This is needed by react-jsonschema-form's RadioWidget and by json-schema-faker
    mockRandom([0.1, 0.2, 0.3, 0.4, 0.5]);
  });

  const environment = createMockEnvironment();
  const TestRenderer = () => (
    <MockRouter>
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
    </MockRouter>
  );

  it('should match the snapshot with the administration form', async () => {
    const renderer = create(<TestRenderer />);
    environment.mock.resolveMostRecentOperation((operation) =>
      MockPayloadGenerator.generate(operation, {
        Query() {
          return {
            result: {
              formResult: generateFakeSchemaData(adminForm as FormJson),
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
    environment.mock.resolveMostRecentOperation((operation) =>
      MockPayloadGenerator.generate(operation, {
        Query() {
          return {
            result: {
              formResult: generateFakeSchemaData(fuelForm as FormJson),
              formJsonByFormId: {
                name: 'Fuel',
                formJson: fuelForm
              }
            },
            allFuels: {
              edges: [
                {
                  node: {
                    rowId: 1,
                    units: 't'
                  }
                },
                {node: {rowId: 2, units: 'kL'}}
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
    environment.mock.resolveMostRecentOperation((operation) =>
      MockPayloadGenerator.generate(operation, {
        Query() {
          return {
            result: {
              formResult: generateFakeSchemaData(emissionForm as FormJson),
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

  it('should match the snapshot with the production form', async () => {
    const renderer = create(<TestRenderer />);
    const data = generateFakeSchemaData(productionForm as FormJson);
    environment.mock.resolveMostRecentOperation((operation) =>
      MockPayloadGenerator.generate(operation, {
        Query() {
          return {
            result: {
              formResult: data,
              formJsonByFormId: {
                name: 'Production',
                formJson: productionForm
              },
              allProducts: {
                edges: [
                  {
                    node: {
                      rowId: 1,
                      name: 'one',
                      units: 'kL',
                      state: 'active'
                    }
                  }
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
