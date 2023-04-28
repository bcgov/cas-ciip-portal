import React from "react";
import { shallow } from "enzyme";
import { VerificationStatement_application } from "__generated__/VerificationStatement_application.graphql";
import { VerificationStatementComponent } from "containers/Forms/VerificationStatement";

const getAttachmentDownloadRoute = require("routes");

jest.mock("routes");

describe("The Attachment Upload Component", () => {
  const application: VerificationStatement_application = {
    " $refType": "VerificationStatement_application",
    rowId: 1,
    latestDraftRevision: {
      versionNumber: 1,
    },
    attachmentsByApplicationId: {
      __id: "abc",
      edges: [
        {
          node: {
            fileName: "test-filename",
            id: "test-id",
            rowId: 7,
            createdAt: "date",
          },
        },
      ],
    },
  };
  const onError = jest.fn();

  it("should match the snapshot", () => {
    const wrapper = shallow(
      <VerificationStatementComponent
        application={application}
        relay={null}
        onError={onError}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("renders the component", () => {
    const wrapper = shallow(
      <VerificationStatementComponent
        application={application}
        relay={null}
        onError={onError}
      />
    );
    expect(wrapper.find("h1").text()).toEqual("Verification Statement");
    expect(wrapper.find("FilePicker").exists()).toBe(true);
    expect(wrapper.find("div.attachment-link").exists()).toBe(true);
    expect(wrapper.find("div.uploaded-on").exists()).toBe(true);
  });

  it("calls the download router", () => {
    const wrapper = shallow(
      <VerificationStatementComponent
        application={application}
        relay={null}
        onError={onError}
      />
    );
    const mockDownloadRoute = jest.spyOn(
      getAttachmentDownloadRoute,
      "getAttachmentDownloadRoute"
    );

    mockDownloadRoute.mockImplementationOnce(() => {
      jest.fn();
    });
    wrapper.find("div.attachment-link").simulate("click");
    expect(mockDownloadRoute).toHaveBeenCalledWith("test-id");
  });
});
