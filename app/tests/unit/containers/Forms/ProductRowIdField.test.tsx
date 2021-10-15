import React from "react";
import { shallow } from "enzyme";
import { ProductRowIdFieldComponent } from "containers/Forms/ProductRowIdField";
import { ProductRowIdField_query } from "__generated__/ProductRowIdField_query.graphql";
import { ProductRowIdField_naicsCode } from "__generated__/ProductRowIdField_naicsCode.graphql";
import { createDefaultJsonSchemaFormProps } from "tests/json-schema-utils";

describe("The ProductionRowIdField Component with published product matched to a naics code", () => {
  const query: ProductRowIdField_query = {
    " $refType": "ProductRowIdField_query",
    published: {
      edges: [
        {
          node: {
            rowId: 1,
            productName: "foo",
          },
        },
        {
          node: {
            rowId: 2,
            productName: "dontrenderme",
          },
        },
        {
          node: {
            rowId: 20,
            productName: "aaaa",
          },
        },
      ],
    },
    archived: {
      edges: [
        {
          node: {
            rowId: 3,
            productName: "bar",
          },
        },
      ],
    },
  };
  const naicsCode: ProductRowIdField_naicsCode = {
    " $refType": "ProductRowIdField_naicsCode",
    productNaicsCodes: {
      edges: [
        {
          node: {
            productByProductId: {
              rowId: 1,
              productName: "foo",
            },
          },
        },
        {
          node: {
            productByProductId: {
              rowId: 20,
              productName: "aaaa",
            },
          },
        },
      ],
    },
  };

  const props = {
    ...createDefaultJsonSchemaFormProps(),
    formData: 1,
    query,
    naicsCode,
  };

  it("should match the snapshot", () => {
    const wrapper = shallow(<ProductRowIdFieldComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should contain the alphabetically sorted products in productsByNaicsCode when passed a naicsCode", () => {
    const wrapper = shallow(<ProductRowIdFieldComponent {...props} />);
    expect(
      wrapper.find("StringField").prop("schema" as any).enumNames
    ).toEqual(["aaaa", "foo"]);
  });

  it("should not contain the products not in productsByNaicsCode when passed a naicsCode", () => {
    const wrapper = shallow(<ProductRowIdFieldComponent {...props} />);
    expect(
      wrapper
        .find("StringField")
        .prop("schema" as any)
        .enumNames.some((name) => name === "dontrenderme")
    ).toBe(false);
  });
});

describe("The ProductionRowIdField Component with archived product", () => {
  const query: ProductRowIdField_query = {
    " $refType": "ProductRowIdField_query",
    published: {
      edges: [],
    },
    archived: {
      edges: [
        {
          node: {
            rowId: 1,
            productName: "bar",
          },
        },
      ],
    },
  };
  const naicsCode: ProductRowIdField_naicsCode = {
    " $refType": "ProductRowIdField_naicsCode",
    productNaicsCodes: {
      edges: [],
    },
  };

  const props = {
    ...createDefaultJsonSchemaFormProps(),
    formData: 1,
    query,
    naicsCode,
  };

  it("should match the snapshot", () => {
    const wrapper = shallow(<ProductRowIdFieldComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the product name in an input group", () => {
    const wrapper = shallow(<ProductRowIdFieldComponent {...props} />);
    expect(wrapper.find("InputGroup").text()).toBe("bar");
  });
});

describe("The ProductionFields Component without naics code", () => {
  const query: ProductRowIdField_query = {
    " $refType": "ProductRowIdField_query",
    published: {
      edges: [
        {
          node: {
            rowId: 1,
            productName: "foo",
          },
        },
        {
          node: {
            rowId: 1,
            productName: "dontrenderme",
          },
        },
      ],
    },
    archived: {
      edges: [
        {
          node: {
            rowId: 2,
            productName: "bar",
          },
        },
      ],
    },
  };

  const props = {
    ...createDefaultJsonSchemaFormProps(),
    formData: 1,
    query,
  };

  it("should match the snapshot", () => {
    const wrapper = shallow(<ProductRowIdFieldComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the product name in an input group", () => {
    const wrapper = shallow(<ProductRowIdFieldComponent {...props} />);
    expect(wrapper.find("InputGroup").text()).toBe("foo");
  });
});
