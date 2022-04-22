import React from "react";
import EmissionFieldComponent from "containers/Forms/EmissionField";
import { mount } from "enzyme";
import { createDefaultJsonSchemaFormProps } from "tests/json-schema-utils";

describe("The EmissionField", () => {
  it("Displays the emission total passed in as a prop", () => {
    const componentUnderTest = mount(
      <EmissionFieldComponent
        totalOnsiteEmissions={1234567.89}
        {...createDefaultJsonSchemaFormProps()}
      />
    );

    expect(componentUnderTest.text()).toContain(
      "Total On-site Emissions (excl. CO2BioC): 1,234,567.89 tCO2e"
    );
  });
});
