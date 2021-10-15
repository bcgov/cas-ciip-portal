import React from "react";
import { shallow } from "enzyme";
import { OrganisationRequestsTable_query } from "__generated__/OrganisationRequestsTable_query.graphql";
import { OrganisationRequestsTableComponent } from "containers/Admin/OrganisationRequestsTable";

describe("Organisations", () => {
  it("should render the user's requested organisations", async () => {
    const query: OrganisationRequestsTable_query = {
      " $refType": "OrganisationRequestsTable_query",
      allCiipUserOrganisations: {
        totalCount: 1,
        edges: [
          {
            node: {
              id: "abc",
              " $fragmentRefs": {
                OrganisationRequestsTableRow_userOrganisation: true,
              },
            },
          },
        ],
      },
    };
    const r = shallow(<OrganisationRequestsTableComponent query={query} />);
    expect(r).toMatchSnapshot();
    expect(r.exists("FilterableTable")).toBe(true);
  });
});
