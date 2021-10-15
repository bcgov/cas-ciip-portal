import React from "react";
import { shallow } from "enzyme";
import { AllowableProductsTableRowComponent } from "containers/Admin/ProductNaicsCode/AllowableProductsTableRow";

describe("The allowable product table row for a given NAICS code", () => {
  const mockNaicsCodeRelayId = "A-relay-ID";
  const productNaicsCode = {
    productByProductId: {
      id: "abc",
      productName: "One fancy non-mandatory product",
    },
    isMandatory: false,
    deletedAt: null,
    id: "abcd",
  };

  it("Should render NO for a non-mandatory product", () => {
    const componentUnderTest = shallow(
      <AllowableProductsTableRowComponent
        relay={{ environment: null } as any}
        naicsCodeId={mockNaicsCodeRelayId}
        productNaicsCode={{
          ...productNaicsCode,
          " $refType": "AllowableProductsTableRow_productNaicsCode",
        }}
      />
    );
    expect(componentUnderTest).toMatchSnapshot();
  });

  it("Should render YES and a checkmark for a mandatory product", () => {
    const componentUnderTest = shallow(
      <AllowableProductsTableRowComponent
        relay={{ environment: null } as any}
        naicsCodeId={mockNaicsCodeRelayId}
        productNaicsCode={{
          ...productNaicsCode,
          isMandatory: true,
          " $refType": "AllowableProductsTableRow_productNaicsCode",
        }}
      />
    );
    expect(componentUnderTest).toMatchSnapshot();
  });

  it("Should display a modal when hitting the Delete button", () => {
    const componentUnderTest = shallow(
      <AllowableProductsTableRowComponent
        relay={{ environment: null } as any}
        naicsCodeId={mockNaicsCodeRelayId}
        productNaicsCode={{
          ...productNaicsCode,
          " $refType": "AllowableProductsTableRow_productNaicsCode",
        }}
      />
    );

    expect(
      componentUnderTest.find("DeleteConfirmationModal").prop("show")
    ).toBe(false);
    componentUnderTest.find("Button").simulate("click");
    expect(
      componentUnderTest.find("DeleteConfirmationModal").prop("show")
    ).toBe(true);
  });

  it("Should call the delete mutation when confirming the modal", () => {
    const spy = jest
      .spyOn(
        require("mutations/product_naics_code/deleteProductNaicsCodeMutation"),
        "default"
      )
      .mockImplementation(() => {});

    const componentUnderTest = shallow(
      <AllowableProductsTableRowComponent
        relay={{ environment: "relay env" } as any}
        naicsCodeId={mockNaicsCodeRelayId}
        productNaicsCode={{
          ...productNaicsCode,
          " $refType": "AllowableProductsTableRow_productNaicsCode",
        }}
      />
    );
    const deleteCallback = componentUnderTest
      .find("DeleteConfirmationModal")
      .prop("handleDelete") as (e: React.SyntheticEvent<any>) => Promise<void>;
    deleteCallback({} as any);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(
      "relay env",
      "A-relay-ID",
      {
        " $refType": "AllowableProductsTableRow_productNaicsCode",
        ...productNaicsCode,
      },
      "AllowableProducts_productNaicsCodesByNaicsCodeId"
    );
  });
});
