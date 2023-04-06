import React from "react";
import { shallow } from "enzyme";
import { ManageBceidUserTable_query } from "__generated__/ManageBceidUserTable_query.graphql";
import { ManageBceidUserTableComponent } from "containers/User/ManageBceidUserTable";

describe("Organisations", () => {
  it("should render the user's requested organisations", async () => {
    const query: ManageBceidUserTable_query = {
      " $refType": "ManageBceidUserTable_query",
      allCiipUsers: {
        totalCount: 1,
        edges: [
          {
            node: {
              id: "abc",
              " $fragmentRefs": {
                ManageBceidUserTableRow_user: true,
              },
            },
          },
        ],
      },
    };
    const r = shallow(<ManageBceidUserTableComponent query={query} />);
    expect(r).toMatchSnapshot();
    expect(r.exists("FilterableTable")).toBe(true);
  });
});
