import React from 'react';
import {QueryRenderer, graphql} from 'react-relay';
import {createMockEnvironment, MockPayloadGenerator} from 'relay-test-utils';
import {ApplicationDetailsContainerTestQuery} from 'ApplicationDetailsContainerTestQuery.graphql';
import {create} from 'react-test-renderer';
import {mockRandom} from 'jest-mock-random';
import ApplicationDetailsContainer from 'containers/Applications/ApplicationDetailsContainer';
import adminForm from 'schema/data/portal/form_json/administration.json';
import emissionForm from 'schema/data/portal/form_json/emission.json';
import fuelForm from 'schema/data/portal/form_json/fuel.json';
import electricityAndHeatForm from 'schema/data/portal/form_json/electricity_and_heat.json';
import productionForm from 'schema/data/portal/form_json/production.json';
import {FormJson} from 'next-env';
import {generateFakeSchemaData} from '../json-schema-utils';

describe('ApplicationDetailsContainer', () => {
  beforeEach(() => {
    // Mock Math.random() to be deterministic.
    // This is needed by react-jsonschema-form's RadioWidget and by json-schema-faker
    mockRandom([0.1, 0.2, 0.3, 0.4, 0.5]);
  });

  const environment = createMockEnvironment();
  const TestRenderer = () => (
    <QueryRenderer<ApplicationDetailsContainerTestQuery>
      environment={environment}
      query={graphql`
        query ApplicationDetailsContainerTestQuery($applicationId: ID!) {
          query {
            application(id: $applicationId) {
              applicationRevisionStatus {
                id
              }
              ...ApplicationDetailsContainer_application
            }
            ...ApplicationDetailsContainer_query
          }
        }
      `}
      variables={{applicationId: '2'}}
      render={({error, props}) => {
        if (props) {
          return (
            <ApplicationDetailsContainer
              isAnalyst={false}
              query={props.query}
              application={props.query.application}
            />
          );
        }

        if (error) {
          return error.message;
        }

        return 'Loading...';
      }}
    />
  );

  it('should match the snapshot with the summary component', async () => {
    const renderer = create(<TestRenderer />);
    environment.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, {
        Query() {
          return {
            application: {
              id: '2',
              formResultsByApplicationId: {
                edges: [
                  {
                    node: {
                      id: 'admin',
                      formResult: generateFakeSchemaData(adminForm as FormJson),
                      formJsonByFormId: {
                        name: 'Admin',
                        formJson: adminForm
                      }
                    }
                  },
                  {
                    node: {
                      id: 'emission',
                      formResult: generateFakeSchemaData(
                        emissionForm as FormJson
                      ),
                      formJsonByFormId: {
                        name: 'Emission',
                        formJson: emissionForm
                      }
                    }
                  },
                  {
                    node: {
                      id: 'fuel',
                      formResult: generateFakeSchemaData(fuelForm as FormJson),
                      formJsonByFormId: {
                        name: 'Fuel',
                        formJson: fuelForm
                      }
                    }
                  },
                  {
                    node: {
                      id: 'E&H',
                      formResult: generateFakeSchemaData(
                        electricityAndHeatForm as FormJson
                      ),
                      formJsonByFormId: {
                        name: 'Electricity and Heat',
                        formJson: electricityAndHeatForm
                      }
                    }
                  },
                  {
                    node: {
                      id: 'Production',
                      formResult: generateFakeSchemaData(
                        productionForm as FormJson
                      ),
                      formJsonByFormId: {
                        name: 'Production',
                        formJson: productionForm
                      }
                    }
                  }
                ]
              },
              applicationRevisionStatusesByApplicationId: {
                id: 'status1'
              }
            }
          };
        }
      })
    );
    expect(renderer).toMatchSnapshot();
  });
});
