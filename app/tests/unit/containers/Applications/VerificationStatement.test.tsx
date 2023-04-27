import React from "react";
import { shallow } from "enzyme";
import { VerificationStatement_application } from "__generated__/VerificationStatement_application.graphql";
import { VerificationStatementComponent } from "containers/Forms/VerificationStatement";
import deleteAttachmentMutation from "mutations/application/deleteAttachment";
// import * as nextRouter from "next/router";
const next = require("next/router");
jest.mock("next/router");

const getAttachmentDownloadRoute = require("routes");
jest.mock("routes");

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  push: jest.fn(),
  // query: "",
}));
// nextRouter.useRouter = jest.fn();
// nextRouter.useRouter.mockImplementation(() => ({
//   push: jest.fn(),
//   // query: "",
// }));
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
      "test-filename January 11th, 11111"
    );
    expect(wrapper.find("tr").at(2).text()).toEqual(
      "test-filename-2 <FontAwesomeIcon />February 22nd, 22222"
    );
    expect(wrapper.find("tr.latest-version").text()).toEqual(
      "test-filename-2 <FontAwesomeIcon />February 22nd, 22222"
    );
  });

  it("calls the delete mutation", () => {
    const wrapper = shallow(
      <VerificationStatementComponent
        application={application}
        relay={null}
        onError={onError}
      />
    );

    const mockedUseRouter = jest.spyOn(next, "useRouter");

    mockedUseRouter.mockImplementationOnce(() => {
      push: jest.fn();
    });

    wrapper.find("FontAwesomeIcon").simulate("click");
    expect(mockedUseRouter).toHaveBeenCalledWith("l");
  });
  it("shows a custom error message", () => {
    const wrapper = shallow(
      <VerificationStatementComponent
        application={application}
        relay={null}
        onError={onError}
      />
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

    wrapper.find("div.attachment-link").at(0).simulate("click");
    wrapper.find("div.attachment-link").at(1).simulate("click");

    expect(mockDownloadRoute).toHaveBeenCalledWith("test-id");
    expect(mockDownloadRoute).toHaveBeenCalledWith("test-id-2");
  });
});
