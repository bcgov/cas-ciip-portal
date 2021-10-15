import React from "react";
import { shallow } from "enzyme";
import ApplicationPage from "pages/reporter/application/[applicationId]/index";
import { ApplicationIdPageQueryResponse } from "ApplicationIdPageQuery.graphql";

const query: ApplicationIdPageQueryResponse["query"] = {
  session: {
    " $fragmentRefs": {
      defaultLayout_session: true,
    },
  },
  " $fragmentRefs": {
    ApplicationWizard_query: true,
  },
  application: {
    rowId: 1,
    facilityByFacilityId: {
      bcghgid: "1234",
    },
    id: "1",
    latestSubmittedRevision: {
      versionNumber: 1,
    },
    latestDraftRevision: {
      versionNumber: 2,
      legalDisclaimerAccepted: true,
      " $fragmentRefs": {
        ApplicationWizard_applicationRevision: true,
      },
    },
  },
};

describe("The /reporter/application/[applicationId] page", () => {
  // It matches the last accepted Snapshot
  it("matches the last accepted Snapshot", () => {
    const wrapper = shallow(<ApplicationPage query={query} router={null} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("passes a query to the ApplicationWizard component", () => {
    const wrapper = shallow(<ApplicationPage query={query} router={null} />);
    expect(
      wrapper.find("Relay(ApplicationWizardComponent)").prop("query")
    ).toBe(query);
  });
});
