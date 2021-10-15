import React from "react";
import { mount } from "enzyme";
import Money from "components/helpers/Money";

describe("Money", () => {
  it("adds currency symbol", () => {
    const r = mount(<Money amount="15.52" />);
    expect(r).toMatchSnapshot();
  });
  it("separates thousands", () => {
    const r = mount(<Money amount="5005615.52" />);
    expect(r).toMatchSnapshot();
  });
});
