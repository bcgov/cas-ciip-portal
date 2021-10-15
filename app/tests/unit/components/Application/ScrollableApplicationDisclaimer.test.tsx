import React from "react";
import { shallow } from "enzyme";
import ScrollableApplicationDisclaimer from "components/Application/ScrollableApplicationDisclaimer";

describe("Scrollable application disclaimer", () => {
  it("should match the last snapshot", () => {
    const render = shallow(<ScrollableApplicationDisclaimer />);
    expect(render).toMatchSnapshot();
  });
});
