import React from "react";
import { shallow } from "enzyme";
import { ManageBceidUserTableRow_userOrganisation } from "__generated__/ManageBceidUserTableRow_userOrganisation.graphql";
import { ManageBceidUserTableRowComponent } from "containers/User/ManageBceidUserTableRow";

describe("Organisation request rows", () => {
  it("should render an organisation properly", async () => {
    const user: ManageBceidUserTableRow_userOrganisation = {
      " $refType": "ManageBceidUserTableRow_userOrganisation",
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
