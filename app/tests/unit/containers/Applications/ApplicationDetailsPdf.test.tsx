import React from 'react';
import {shallow} from 'enzyme';
import {FormJson} from 'next-env';
import {mockRandom} from 'jest-mock-random';
import {ApplicationDetailsPdf} from 'containers/Applications/ApplicationDetailsPdf';
import adminForm from 'schema/data/prod/form_json/administration.json';
import emissionForm from 'schema/data/prod/form_json/emission.json';
import fuelForm from 'schema/data/prod/form_json/fuel.json';
import electricityAndHeatForm from 'schema/data/prod/form_json/electricity_and_heat.json';
import productionForm from 'schema/data/prod/form_json/production.json';
import {generateFakeSchemaData} from '../../../integration/json-schema-utils';

describe('ApplicationDetailsPdf', () => {
  beforeEach(() => {
    // Mock Math.random() to be deterministic.
    // This is needed by react-jsonschema-form's RadioWidget and by json-schema-faker
    mockRandom([0.1, 0.2, 0.3, 0.4, 0.5]);
  });

  it('should render application pdf donwload link', async () => {
    const renderer = shallow(
      <ApplicationDetailsPdf
        application={{
          ' $refType': 'ApplicationDetailsPdf_application',
          applicationRevisionStatus: {
            applicationRevisionStatus: 'SUBMITTED'
          },
          reportingYear: 2019,
          facilityByFacilityId: {
            facilityName: 'Forest Floor',
            facilityMailingAddress: 'Evergreen Street Northwest',
            facilityCity: 'Oak Grove',
            facilityCountry: 'Canada',
            facilityProvince: 'British Columbia',
            facilityPostalCode: 'V1C6T8'
          },
          formResultsByApplicationId: {
            edges: [
              {
                node: {
                  formResult: generateFakeSchemaData(adminForm as FormJson),
                  formJsonByFormId: {
                    name: 'Admin',
                    formJson: adminForm
                  }
                }
              },
              {
                node: {
                  formResult: generateFakeSchemaData(emissionForm as FormJson),
                  formJsonByFormId: {
                    name: 'Emission',
                    formJson: emissionForm
                  }
                }
              },
              {
                node: {
                  formResult: generateFakeSchemaData(fuelForm as FormJson),
                  formJsonByFormId: {
                    name: 'Fuel',
                    formJson: fuelForm
                  }
                }
              },
              {
                node: {
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
          }
        }}
        query={{
          ' $refType': 'ApplicationDetailsPdf_query',
          allProducts: {
            edges: [
              {
                node: {
                  rowId: 1,
                  name: 'foo'
                }
              },
              {
                node: {
                  rowId: 2,
                  name: 'simpleFoo'
                }
              }
            ]
          }
        }}
      />
    );
    expect(renderer).toMatchSnapshot();
  });
});
