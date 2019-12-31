import React from "react";
import { shallow } from "enzyme";
import { ApplicationDetailsPdf } from "containers/Applications/ApplicationDetailsPdf";
import { generateFakeSchemaData } from "../../../integration/json-schema-utils";
import adminForm from "schema/data/portal/form_json/administration.json";
import emissionForm from "schema/data/portal/form_json/emission.json";
import fuelForm from "schema/data/portal/form_json/fuel.json";
import electricityAndHeatForm from "schema/data/portal/form_json/electricity_and_heat.json";
import productionForm from "schema/data/portal/form_json/production.json";
import { FormJson } from "next-env";

describe("ApplicationDetailsPdf", () => {
  it("should render application pdf donwload link", async () => {
    const renderer = shallow(
      <ApplicationDetailsPdf
        application={{
          " $refType": "ApplicationDetailsPdf_application",
          applicationRevisionStatus: {
            applicationRevisionStatus: "SUBMITTED"
          },
          reportingYear: 2019,
          facilityByFacilityId: {
            facilityName: "Forest Floor",
            facilityMailingAddress: "Evergreen Street Northwest",
            facilityCity: "Oak Grove",
            facilityCountry: "Canada",
            facilityProvince: "British Columbia",
            facilityPostalCode: "V1C6T8"
          },
          formResultsByApplicationId: {
            edges: [
              {
                node: {
                  formResult: generateFakeSchemaData(adminForm as FormJson),
                  formJsonByFormId: {
                    name: "Admin",
                    formJson: adminForm
                  }
                }
              },
              {
                node: {
                  formResult: generateFakeSchemaData(emissionForm as FormJson),
                  formJsonByFormId: {
                    name: "Emission",
                    formJson: emissionForm
                  }
                }
              },
              {
                node: {
                  formResult: generateFakeSchemaData(fuelForm as FormJson),
                  formJsonByFormId: {
                    name: "Fuel",
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
                    name: "Electricity and Heat",
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
                    name: "Production",
                    formJson: productionForm
                  }
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
