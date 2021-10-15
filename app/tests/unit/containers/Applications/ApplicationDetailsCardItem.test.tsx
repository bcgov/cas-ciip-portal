import React from "react";
import { shallow } from "enzyme";
import { ApplicationDetailsCardItemComponent } from "containers/Applications/ApplicationDetailsCardItem";
import { ApplicationDetailsCardItem_query } from "__generated__/ApplicationDetailsCardItem_query.graphql";
import { ApplicationDetailsCardItem_formResult } from "__generated__/ApplicationDetailsCardItem_formResult.graphql";

describe("ApplicationDetailsCardItemComponent", () => {
  it("should render the individual summary confirmation card component", () => {
    const formResult = {
      " $refType": "ApplicationDetailsCardItem_formResult" as any,
      formResult: {},
      formJsonByFormId: {
        name: "Fuel Usage",
        formJson: { schema: { title: "Fuel UsageCollapse" }, uiSchema: {} },
        slug: "fuel",
      },
      applicationRevisionByApplicationIdAndVersionNumber: null,
    };
    const query: ApplicationDetailsCardItem_query = {
      " $refType": "ApplicationDetailsCardItem_query",
      " $fragmentRefs": {
        ProductField_query: true as true,
        ProductRowIdField_query: true as true,
        NaicsField_query: true as true,
        FuelField_query: true as true,
        FuelRowIdField_query: true as true,
        EmissionCategoryRowIdField_query: true as true,
      },
    };

    const r = shallow(
      <ApplicationDetailsCardItemComponent
        query={query}
        formResult={formResult}
        showDiff={false}
        liveValidate={false}
        diffToResults={[]}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.find("CardHeader").text()).toContain("Fuel Usage");
  });
  it("should add the diffArray and diffPathArray to formContext with proper values", () => {
    const formResult: ApplicationDetailsCardItem_formResult = {
      " $refType": "ApplicationDetailsCardItem_formResult",
      formResult: { fuelType: "Diesel" },
      formJsonByFormId: {
        name: "Fuel Usage",
        formJson: { schema: { title: "Fuel UsageCollapse" }, uiSchema: {} },
        slug: "fuel",
      },
      applicationRevisionByApplicationIdAndVersionNumber: null,
    };
    const query: ApplicationDetailsCardItem_query = {
      " $fragmentRefs": {
        EmissionCategoryRowIdField_query: true,
        FuelField_query: true,
        FuelRowIdField_query: true,
        NaicsField_query: true,
        ProductField_query: true,
        ProductRowIdField_query: true,
      },
      " $refType": "ApplicationDetailsCardItem_query",
    };

    const r = shallow(
      <ApplicationDetailsCardItemComponent
        showDiff
        liveValidate={false}
        query={query}
        formResult={formResult}
        diffToResults={[
          {
            node: {
              formResult: { fuelType: "after" },
              formJsonByFormId: { slug: "fuel" },
            },
          },
        ]}
        diffFromResults={[
          {
            node: {
              formResult: { fuelType: "before" },
              formJsonByFormId: { slug: "fuel" },
            },
          },
        ]}
      />
    );
    expect(
      r.find("Form").props().formContext.idDiffMap["fuel-usage_fuelType"]
    ).toStrictEqual({
      lhs: "before",
      rhs: "after",
    });
  });
});
