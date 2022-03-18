import React from "react";
import { mount } from "enzyme";
import GgircsAppLink from "components/Dashboard/ggircsAppLink";

describe("the ggircs app link component", () => {
  const oldEnvironment = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...oldEnvironment };
  });

  afterAll(() => {
    process.env = oldEnvironment;
  });

  it("matches the snapshot with the ggircs link", () => {
    process.env.GGIRCS_HOST = "a-test-ggircs-host";
    const componentUnderTest = mount(<GgircsAppLink />);
    expect(componentUnderTest).toMatchSnapshot();
  });
});
