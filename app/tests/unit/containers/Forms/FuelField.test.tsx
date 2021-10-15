import { FuelFieldComponent } from "containers/Forms/FuelField";
import { shallow } from "enzyme";
import React from "react";
import { createDefaultJsonSchemaFormProps } from "tests/json-schema-utils";
import { FuelField_query } from "__generated__/FuelField_query.graphql";

describe("The Fuel Field", () => {
  it("renders an interactive form when the form data fuel is active", () => {
    const testQuery: FuelField_query = {
      allFuels: {
        edges: [
          {
            node: {
              rowId: 1,
              state: "published",
              units: "unit",
            },
          },
        ],
      },
      " $refType": "FuelField_query",
    };
    const initialProps = {
      ...createDefaultJsonSchemaFormProps(),
      formData: {
        fuelRowId: 1,
      },
      query: testQuery,
    };

    const component = shallow(<FuelFieldComponent {...initialProps} />);

    expect(component).toMatchSnapshot();
    expect(component.find("ObjectField").at(0).prop("disabled")).toBe(false);
  });

  it("renders an interactive form when the form data is undefined", () => {
    const testQuery: FuelField_query = {
      allFuels: {
        edges: [
          {
            node: {
              rowId: 1,
              state: "published",
              units: "unit",
            },
          },
        ],
      },
      " $refType": "FuelField_query",
    };
    const initialProps = {
      ...createDefaultJsonSchemaFormProps(),
      formData: {
        fuelRowId: undefined,
      },
      query: testQuery,
    };

    const component = shallow(<FuelFieldComponent {...initialProps} />);

    expect(component).toMatchSnapshot();
    expect(component.find("ObjectField").at(0).prop("disabled")).toBe(false);
  });

  it("renders a disabled form when the form data fuel is archived", () => {
    const testQuery: FuelField_query = {
      allFuels: {
        edges: [
          {
            node: {
              rowId: 1,
              state: "archived",
              units: "unit",
            },
          },
        ],
      },
      " $refType": "FuelField_query",
    };
    const initialProps = {
      ...createDefaultJsonSchemaFormProps(),
      formData: {
        fuelRowId: 1,
      },
      query: testQuery,
    };

    const component = shallow(<FuelFieldComponent {...initialProps} />);

    expect(component).toMatchSnapshot();
    expect(component.find("ObjectField").at(0).prop("disabled")).toBe(true);
  });
});
