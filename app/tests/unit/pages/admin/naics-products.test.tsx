import React from "react";
import NaicsProducts from "pages/admin/naics-products";
import { shallow } from "enzyme";
import { naicsProductsAssociationsQueryResponse } from "__generated__/naicsProductsAssociationsQuery.graphql";

describe("the product naics page", () => {
  const query: naicsProductsAssociationsQueryResponse["query"] = {
    " $fragmentRefs": { ProductNaicsCodeAssociation_query: true },
    session: {
      " $fragmentRefs": { defaultLayout_session: true },
    },
  };

  it("matches the last accepted Snapshot", () => {
    const wrapper = shallow(<NaicsProducts query={query} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("passes a query to the association component", () => {
    const wrapper = shallow(<NaicsProducts query={query} />);
    expect(
      wrapper.find("Relay(ProductNaicsCodeAssociationContainer)").prop("query")
    ).toBe(query);
  });
});
