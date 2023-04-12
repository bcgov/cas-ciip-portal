import React from "react";
import { shallow, mount } from "enzyme";
import { VerificationStatement_application } from "__generated__/VerificationStatement_application.graphql";
import { VerificationStatementComponent } from "containers/Forms/VerificationStatement";

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

  it("should match the snapshot", () => {
    const wrapper = shallow(
      <VerificationStatementComponent application={application} relay={null} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("renders the component", () => {
    const wrapper = shallow(
      <VerificationStatementComponent application={application} relay={null} />
    );
    // brianna these don't work
    expect(wrapper.find("h1").text()).toEqual("Verification Statement");
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find("a.attachment-link").exists()).toBe(true);
  });
});
