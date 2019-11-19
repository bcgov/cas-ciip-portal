import React from 'react';
import {QueryRenderer, graphql} from 'react-relay';
import {createMockEnvironment, MockPayloadGenerator} from 'relay-test-utils';
import {ApplicationWizardConfirmationTestQuery} from 'ApplicationWizardConfirmationTestQuery.graphql';
import {create} from 'react-test-renderer';
import ApplicationWizardConfirmation from '../../../containers/Applications/ApplicationWizardConfirmation';
import adminForm from '../../../../schema/data/portal/form_json/administration.json';
import emissionForm from '../../../../schema/data/portal/form_json/emission.json';
import fuelForm from '../../../../schema/data/portal/form_json/fuel.json';
import electricityAndHeatForm from '../../../../schema/data/portal/form_json/electricity_and_heat.json';
import productionForm from '../../../../schema/data/portal/form_json/production.json';

describe('ApplicationWizardConfirmationComponent', () => {
  const environment = createMockEnvironment();
  const TestRenderer = () => (
    <QueryRenderer<ApplicationWizardConfirmationTestQuery>
      environment={environment}
      query={graphql`
        query ApplicationWizardConfirmationTestQuery($applicationId: ID!) {
          query {
            ...ApplicationWizardConfirmation_query
              @arguments(applicationId: $applicationId)
          }
        }
      `}
      variables={{applicationId: '2'}}
      render={({error, props}) => {
        if (props) {
          return <ApplicationWizardConfirmation query={props.query} />;
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
                      formResult: {
                        operator: {name: 'TestOperator'},
                        facility: {facilityName: 'fac1'},
                        operationalRepresentative: {firstName: 'DoogieHouser'}
                      },
                      formJsonByFormId: {
                        name: 'Admin',
                        formJson: adminForm
                      }
                    }
                  },
                  {
                    node: {
                      id: 'emission',
                      formResult: {
                        sourceTypes: [
                          {
                            sourceTypeName: 'Stationary Fuel Combustion',
                            gases: [
                              {
                                gwp: 1,
                                gasType: 'CO2nonbio',
                                annualCO2e: 12,
                                annualEmission: 15,
                                gasDescription: 'gassy'
                              },
                              {
                                gwp: 12,
                                gasType: 'CO2',
                                annualCO2e: 1,
                                annualEmission: 12,
                                gasDescription: 'super gassy'
                              }
                            ]
                          },
                          {
                            sourceTypeName: 'Flaring',
                            gases: [
                              {
                                gwp: 1,
                                gasType: 'Waste',
                                annualCO2e: 121,
                                annualEmission: 151,
                                gasDescription: 'wastey'
                              }
                            ]
                          }
                        ]
                      },
                      formJsonByFormId: {
                        name: 'Emission',
                        formJson: emissionForm
                      }
                    }
                  },
                  {
                    node: {
                      id: 'fuel',
                      formResult: [
                        {
                          fuelType: 'diesel',
                          quantity: 123.5,
                          fuelUnits: 'kilolitres',
                          methodology: 'win some lose some'
                        },
                        {
                          fuelType: 'Natural Gas',
                          quantity: 320013,
                          fuelUnits: 'Sm^3',
                          methodology: 'WCI 1.0'
                        }
                      ],
                      formJsonByFormId: {
                        name: 'Fuel',
                        formJson: fuelForm
                      }
                    }
                  },
                  {
                    node: {
                      id: 'E&H',
                      formResult: {
                        heat: {
                          purchased: 12,
                          consumedOnSite: 15,
                          generatedOnSite: 60,
                          sold: 1,
                          onSiteEmissions: 80
                        },
                        electricity: {
                          purchased: 26,
                          consumedOnSite: 135,
                          generatedOnSite: 6130,
                          sold: 1234,
                          onSiteEmissions: 810
                        }
                      },
                      formJsonByFormId: {
                        name: 'Electricity and Heat',
                        formJson: electricityAndHeatForm
                      }
                    }
                  },
                  {
                    node: {
                      id: 'Production',
                      formResult: [
                        {
                          product: 'mayonnaise',
                          quantity: 12,
                          units: 'kL',
                          associatedEmissions: '1',
                          comments: 'a sandwich isnt a sandwich without it'
                        },
                        {
                          product: 'pickles',
                          quantity: 121,
                          units: 't',
                          associatedEmissions: '10000',
                          comments: 'pickles are good'
                        }
                      ],
                      formJsonByFormId: {
                        name: 'Production',
                        formJson: productionForm
                      }
                    }
                  }
                ]
              },
              applicationStatusesByApplicationId: {
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
