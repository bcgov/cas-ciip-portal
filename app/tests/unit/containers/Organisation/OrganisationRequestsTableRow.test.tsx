import React from "react";
import { shallow } from "enzyme";
import { OrganisationRequestsTableRow_userOrganisation } from "__generated__/OrganisationRequestsTableRow_userOrganisation.graphql";
import { OrganisationRequestsTableRowComponent } from "containers/Admin/OrganisationRequestsTableRow";

describe("Organisation request rows", () => {
  it("should render an organisation properly", async () => {
    const org: OrganisationRequestsTableRow_userOrganisation = {
      " $refType": "OrganisationRequestsTableRow_userOrganisation",
      emailAddress: "a@a.a",
      firstName: "First",
      lastName: "Last",
      operatorName: "Company Inc",
      status: "APPROVED",
      id: "abc",
      userId: 1,
    };

    const r = shallow(
      <OrganisationRequestsTableRowComponent
        userOrganisation={org}
        key="1"
        relay={null}
      />
    );
    expect(r).toMatchSnapshot();
  });
});
