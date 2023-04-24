import { FuelRowIdFieldComponent } from "containers/Forms/FuelRowIdField";
import { shallow } from "enzyme";
import React from "react";
import { createDefaultJsonSchemaFormProps } from "tests/json-schema-utils";
import { FuelRowIdField_query } from "__generated__/FuelRowIdField_query.graphql";

describe("The FuelRowIdField component", () => {
  it("renders an active fuel as a StringField", () => {
    const testQuery: FuelRowIdField_query = {
      " $refType": "FuelRowIdField_query",
      archivedFuels: {
        edges: [{ node: { name: "archived fuel", rowId: 2 } }],
      },
    };

    const initialProps = {
      ...createDefaultJsonSchemaFormProps(),
      query: testQuery,
      formData: 1,
    };

    const component = shallow(<FuelRowIdFieldComponent {...initialProps} />);
    expect(component).toMatchSnapshot();
  });
  it("renders an undefined form data as a StringField", () => {
    const testQuery: FuelRowIdField_query = {
      " $refType": "FuelRowIdField_query",
      archivedFuels: {
        edges: [{ node: { name: "archived fuel", rowId: 2 } }],
      },
    };

    const initialProps = {
      ...createDefaultJsonSchemaFormProps(),
      query: testQuery,
      formData: undefined,
    };

    const component = shallow(<FuelRowIdFieldComponent {...initialProps} />);
    expect(component).toMatchSnapshot();
  });
  it("renders an archived fuel as an input group", () => {
    const testQuery: FuelRowIdField_query = {
      " $refType": "FuelRowIdField_query",
      archivedFuels: {
        edges: [{ node: { name: "archived fuel", rowId: 2 } }],
      },
    };

    const initialProps = {
      ...createDefaultJsonSchemaFormProps(),
      query: testQuery,
      formData: 2,
    };

    const component = shallow(<FuelRowIdFieldComponent {...initialProps} />);
    expect(component).toMatchSnapshot();
  });
});
