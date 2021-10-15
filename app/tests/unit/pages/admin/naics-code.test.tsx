import React from "react";
import { shallow } from "enzyme";
import NaicsCodes from "pages/admin/naics-codes";
import { naicsCodesQueryResponse } from "naicsCodesQuery.graphql";

const query: naicsCodesQueryResponse["query"] = {
  session: {
    " $fragmentRefs": {
      defaultLayout_session: true,
    },
  },
  " $fragmentRefs": {
    NaicsCodeTable_query: true,
  },
};

describe("The /admin/naics-codes page", () => {
  // It matches the last accepted Snapshot
  it("matches the last accepted Snapshot", () => {
    const wrapper = shallow(<NaicsCodes query={query} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("passes a query to the NaicsCodeTableContainer Component", () => {
    const wrapper = shallow(<NaicsCodes query={query} />);
    expect(wrapper.find("Relay(NaicsCodeTableContainer)").prop("query")).toBe(
      query
    );
  });
});
