import React from "react";
import { shallow } from "enzyme";
import { DeleteConfirmationModal } from "components/Admin/DeleteConfirmationModal";

describe("CreateNaicsCodeModal", () => {
  it("should match the snapshot with the DeleteConfirmationModal component", async () => {
    const renderer = shallow(
      <DeleteConfirmationModal
        deleteObject={{
          deleteName: "NAICS Code",
          deleteItem: "1234",
          deleteItemDescription: "description",
        }}
        handleDelete={jest.fn()}
        show
        onClose={jest.fn()}
      />
    );
    expect(renderer).toMatchSnapshot();
  });
  it("should call handleDelete when the Confirm button is clicked", async () => {
    const handleDelete = jest.fn();
    const renderer = shallow(
      <DeleteConfirmationModal
        deleteObject={{
          deleteName: "NAICS Code",
          deleteItem: "1234",
          deleteItemDescription: "description",
        }}
        handleDelete={handleDelete}
        show
        onClose={jest.fn()}
      />
    );
    renderer.find("WithPromiseLoading(Button)").at(0).prop("onClick")(
      {} as any
    );
    expect(handleDelete).toBeCalledTimes(1);
  });
});
