import React from "react";
import { mount } from "enzyme";
import GgircsAppLink from "components/Dashboard/ggircsAppLink";

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    GGIRCS_HOST: "a-test-ggircs-host",
  },
}));

describe("the ggircs app link component", () => {
  it("matches the snapshot with the ggircs link", () => {
    const componentUnderTest = mount(<GgircsAppLink />);
    expect(componentUnderTest).toMatchSnapshot();
  });
});
