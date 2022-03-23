import React from "react";
import { mount } from "enzyme";
import ProgramDataManagement from "components/Dashboard/programAdministration";

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    METABASE_HOST: "a-test-metabase-host",
  },
}));

describe("the ggircs app link component", () => {
  it("matches the snapshot with the metabase link", () => {
    const componentUnderTest = mount(<ProgramDataManagement />);
    expect(componentUnderTest).toMatchSnapshot();
  });
});
