import React from "react";
import { mount } from "enzyme";
import ProgramDataManagement from "components/Dashboard/programAdministration";

describe("the ggircs app link component", () => {
  const oldEnvironment = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...oldEnvironment };
  });

  afterAll(() => {
    process.env = oldEnvironment;
  });

  it("matches the snapshot with the metabase link", () => {
    process.env.METABASE_HOST = "a-test-metabase-host";
    const componentUnderTest = mount(<ProgramDataManagement />);
    expect(componentUnderTest).toMatchSnapshot();
  });
});
