import React from "react";
import { shallow } from "enzyme";
import ManageBceidUsers from "pages/analyst/manage-bceid-users";
import { manageBceidUsersQueryResponse } from "manageBceidUsers.graphql";

const query: manageBceidUsersQueryResponse["query"] = {
  session: {
    " $fragmentRefs": {
      defaultLayout_session: true,
    },
  },
  " $fragmentRefs": {
    ManageBceidUserTable_query: true,
  },
};

describe("The /analyst/manage-bcied-users page", () => {
  // It matches the last accepted Snapshot
  it("matches the last accepted Snapshot", () => {
    const wrapper = shallow(<ManageBceidUsers query={query} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("passes a query to the NaicsCodeTableContainer Component", () => {
    const wrapper = shallow(<ManageBceidUsers query={query} />);
    expect(
      wrapper.find("Relay(ManageBceidUserTableComponent)").prop("query")
    ).toBe(query);
  });
});
