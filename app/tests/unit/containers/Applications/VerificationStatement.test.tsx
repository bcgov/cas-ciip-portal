import React from "react";
import { shallow } from "enzyme";
import { VerificationStatement_application } from "__generated__/VerificationStatement_application.graphql";
import { VerificationStatementComponent } from "containers/Forms/VerificationStatement";
import * as nextRouter from "next/router";
import { createMockEnvironment } from "relay-test-utils";
const deleteAttachment = require("mutations/application/deleteAttachment");
const getAttachmentDeleteRoute = require("routes");
const getAttachmentDownloadRoute = require("routes");

const mockRelay = {
  environment: createMockEnvironment(),
  refetch: undefined,
  hasMore: undefined,
};

const mockPush = jest.fn();
nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  push: mockPush.mockResolvedValue(true),
  route: "/",
  query: "",
}));

jest.mock("routes");
jest.mock("mutations/application/deleteAttachment");

describe("The Verification Statement component", () => {
  const onError = jest.fn();
  const application: VerificationStatement_application = {
    " $refType": "VerificationStatement_application",
    rowId: 1,
    latestDraftRevision: {
      versionNumber: 2,
    },
    attachmentsByApplicationId: {
      __id: "abc",
      edges: [
        {
          node: {
            fileName: "test-filename",
            id: "test-id",
            rowId: 7,
            createdAt: "1111-01-11",
            versionNumber: 1,
          },
        },
        {
          node: {
            fileName: "test2-filename",
            id: "test-id-2",
            rowId: 8,
            createdAt: "2222-02-22",
            versionNumber: 2,
          },
        },
      ],
    },
  };
  const emptyApplication: VerificationStatement_application = {
    " $refType": "VerificationStatement_application",
    rowId: 1,
    latestDraftRevision: {
      versionNumber: 2,
    },
    attachmentsByApplicationId: {
      __id: "abc",
      edges: [],
    },
  };

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

  it("renders the component without attachment table when there are no attachments", () => {
    const wrapper = shallow(
      <VerificationStatementComponent
        application={emptyApplication}
        relay={null}
        onError={onError}
      />
    );
    expect(wrapper.find("h1").text()).toEqual("Verification Statement");
    expect(wrapper.find("FilePicker").exists()).toBe(true);
    expect(wrapper.find("table.bc-table").exists()).toBe(false);
  });

  it("renders the component with attachment table", () => {
    const wrapper = shallow(
      <VerificationStatementComponent
        application={application}
        relay={null}
        onError={onError}
      />
    );
    expect(wrapper.find("h1").text()).toEqual("Verification Statement");
    expect(wrapper.find("FilePicker").exists()).toBe(true);
    expect(wrapper.find("table.bc-table").exists()).toBe(true);

    // only current version's row should have delete icon (FontAwesomeIcon)
    expect(wrapper.find("tr").at(1).text()).toEqual(
      "<Link /> January 11th, 11111"
    );
    expect(wrapper.find("tr").at(2).text()).toEqual(
      "<Link /> <FontAwesomeIcon />February 22nd, 22222"
    );
    expect(wrapper.find("tr.latest-version").text()).toEqual(
      "<Link /> <FontAwesomeIcon />February 22nd, 22222"
    );
  });

  it("calls the delete mutation", async () => {
    const wrapper = shallow(
      <VerificationStatementComponent
        application={application}
        relay={mockRelay}
        onError={onError}
      />
    );
    const mockDeleteRoute = jest.spyOn(
      getAttachmentDeleteRoute,
      "getAttachmentDeleteRoute"
    );
    const mockDeleteAttachmentMutation = jest.spyOn(
      deleteAttachment,
      "default"
    );

    mockDeleteRoute.mockImplementation(() => {
      jest.fn();
    });

    wrapper.find("FontAwesomeIcon").simulate("click");

    await expect(mockDeleteRoute).toHaveBeenCalledWith("test-id-2");
    await expect(mockDeleteAttachmentMutation).toHaveReturned();
  });

  it("renders the alert", () => {
    const wrapper = shallow(
      <VerificationStatementComponent
        application={application}
        relay={null}
        onError={onError}
      />
    );
    expect(wrapper.find("Alert").exists()).toBe(true);
    expect(wrapper.find("p").text()).toEqual(
      "A production data verification report is required for either:"
    );
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

    wrapper.find("Link").at(0).simulate("click");
    wrapper.find("Link").at(1).simulate("click");

    expect(mockDownloadRoute).toHaveBeenCalledWith("test-id");
    expect(mockDownloadRoute).toHaveBeenCalledWith("test-id-2");
  });
});
