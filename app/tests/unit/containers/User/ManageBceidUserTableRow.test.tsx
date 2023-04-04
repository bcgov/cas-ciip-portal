import React from "react";
import { shallow } from "enzyme";
import { ManageBceidUserTableRow_user } from "__generated__/ManageBceidUserTableRow_user.graphql";
import { ManageBceidUserTableRowComponent } from "containers/User/ManageBceidUserTableRow";

describe("Manage BCeID Users table", () => {
  it("should render a user properly", async () => {
    const user: ManageBceidUserTableRow_user = {
      " $refType": "ManageBceidUserTableRow_user",
      emailAddress: "a@a.a",
      firstName: "First",
      lastName: "Last",
      allowUuidUpdate: "false",
      id: "abc",
      rowId: 1,
    };

    const r = shallow(
      <ManageBceidUserTableRowComponent user={user} key="1" relay={null} />
    );
    expect(r).toMatchSnapshot();
  });
});
