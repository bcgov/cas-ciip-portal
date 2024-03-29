import React from "react";
import { shallow } from "enzyme";
import ApplicationReview from "pages/analyst/application/[applicationId]";
import {
  ApplicationIdReviewQueryResponse,
  CiipApplicationRevisionStatus,
} from "ApplicationIdReviewQuery.graphql";
import {
  INCENTIVE_ANALYST,
  INCENTIVE_ADMINISTRATOR,
} from "data/group-constants";

import analystCreateApplicationRevisionStatusMutation from "mutations/application/analystCreateApplicationRevisionStatusMutation";
jest.mock(
  "mutations/application/analystCreateApplicationRevisionStatusMutation"
);

const getTestQuery = ({
  applicationRevisionStatus = "SUBMITTED",
  userGroup = INCENTIVE_ANALYST,
  isCurrentVersion = true,
}) => {
  return {
    session: {
      userGroups: [userGroup],
      " $fragmentRefs": {
        defaultLayout_session: true,
      },
    },
    application: {
      " $fragmentRefs": {
        ApplicationDetailsContainer_application: true,
      },
      rowId: 1,
      facilityByFacilityId: {
        bcghgid: "456",
      },
      reviewRevisionStatus: {
        applicationRevisionStatus: applicationRevisionStatus as CiipApplicationRevisionStatus,
        " $fragmentRefs": {
          ApplicationRevisionStatusContainer_applicationRevisionStatus: true,
        },
      },
      applicationReviewStepsByApplicationId: {
        edges: [
          {
            node: {
              id: "abc",
              " $fragmentRefs": {
                ReviewSidebar_applicationReviewStep: true,
              },
            },
          },
        ],
        " $fragmentRefs": {
          ApplicationReviewStepSelector_applicationReviewSteps: true,
        },
      },
      applicationRevision: {
        id: "xyz",
        isCurrentVersion,
        versionNumber: 1,
        overrideJustification: null,
        applicationRevisionStatus: {
          id: "jkl",
          applicationRevisionStatus: applicationRevisionStatus as CiipApplicationRevisionStatus,
        },
        " $fragmentRefs": {
          IncentiveCalculatorContainer_applicationRevision: true,
          ApplicationDetailsContainer_applicationRevision: true,
          ApplicationReviewValidationContainer_applicationRevision: true,
        },
      },
    },
    " $fragmentRefs": {
      ApplicationDetailsContainer_query: true,
      ApplicationDetailsContainer_diffQuery: true,
    },
  } as ApplicationIdReviewQueryResponse["query"];
};

describe("The application-review page", () => {
  beforeEach(() => {
    analystCreateApplicationRevisionStatusMutation.mockReset();
  });

  it("matches the last snapshot (with review sidebar closed)", () => {
    const query = getTestQuery({});
    const wrapper = shallow(<ApplicationReview router={null} query={query} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("matches the last snapshot (with review sidebar opened)", () => {
    const query = getTestQuery({});
    const wrapper = shallow(<ApplicationReview router={null} query={query} />);
    expect(wrapper.exists("Relay(ReviewSidebar)")).toBeFalse();
    // Open the sidebar:
    wrapper.setState((state) => {
      return {
        ...state,
        isSidebarOpened: true,
      };
    });
    expect(wrapper.exists("Relay(ReviewSidebar)")).toBeTrue();
    expect(wrapper.exists("HelpButton")).toBeFalse();
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the review step selector and sidebar with non-finalized state if no application decision has been made", () => {
    const query = getTestQuery({ applicationRevisionStatus: "SUBMITTED" });
    const wrapper = shallow(<ApplicationReview router={null} query={query} />);
    wrapper.setState((state) => {
      return {
        ...state,
        isSidebarOpened: true,
      };
    });
    expect(
      wrapper.find("Relay(ReviewSidebar)").prop("isFinalized")
    ).toBeFalse();
    expect(
      wrapper
        .find("Relay(ApplicationReviewStepSelector)")
        .prop("decisionOrChangeRequestStatus")
    ).toEqual("SUBMITTED");
  });

  it("should render the review step selector and sidebar showing finalized review if an application decision has been made", () => {
    const query = getTestQuery({ applicationRevisionStatus: "APPROVED" });
    const wrapper = shallow(<ApplicationReview router={null} query={query} />);
    wrapper.setState((state) => {
      return {
        ...state,
        isSidebarOpened: true,
      };
    });
    expect(wrapper.find("Relay(ReviewSidebar)").prop("isFinalized")).toBeTrue();
    expect(
      wrapper
        .find("Relay(ApplicationReviewStepSelector)")
        .prop("decisionOrChangeRequestStatus")
    ).not.toEqual("SUBMITTED");
  });

  it("manages the toggle state of the decision modal", () => {
    const query = getTestQuery({});
    const wrapper = shallow(<ApplicationReview router={null} query={query} />);
    expect(wrapper.find("DecisionModal").exists()).toBeTrue();
    expect(wrapper.find("DecisionModal").prop("show")).toBeFalse();

    wrapper.setState((state) => {
      return {
        ...state,
        showDecisionModal: true,
      };
    });
    expect(wrapper.find("DecisionModal").prop("show")).toBeTrue();

    // Canceling out (clicking away or "x" button) the decision modal hides it
    const decisionModalOnHide: () => void = wrapper
      .find("DecisionModal")
      .prop("onHide");
    decisionModalOnHide();
    expect(wrapper.state("showDecisionModal")).toBeFalse();
    expect(wrapper.find("DecisionModal").prop("show")).toBeFalse();

    // Step selector toggles decision modal open
    const stepSelectorToggleOpen: () => void = wrapper
      .find("Relay(ApplicationReviewStepSelector)")
      .prop("onDecisionOrChangeRequestAction");
    stepSelectorToggleOpen();
    expect(wrapper.state("showDecisionModal")).toBeTrue();
    expect(wrapper.find("DecisionModal").prop("show")).toBeTrue();

    // Decision modal is closed after making a decision
    const decisionModalOnDecisionAction: (
      decision: string
    ) => void = wrapper.find("DecisionModal").prop("onDecision");
    decisionModalOnDecisionAction("APPROVED");
    expect(wrapper.state("showDecisionModal")).toBeFalse();
    expect(wrapper.find("DecisionModal").prop("show")).toBeFalse();
  });

  it("saves the application decision", () => {
    const decision = "REQUESTED_CHANGES";

    const query = getTestQuery({});
    const wrapper = shallow(<ApplicationReview router={null} query={query} />);
    expect(
      analystCreateApplicationRevisionStatusMutation
    ).not.toHaveBeenCalled();
    const onDecision: (
      decision: CiipApplicationRevisionStatus
    ) => void = wrapper.find("DecisionModal").prop("onDecision");
    onDecision(decision);
    expect(
      analystCreateApplicationRevisionStatusMutation
    ).toHaveBeenCalledTimes(1);

    // Relay environment (first parameter) is undefined in unit tests:
    expect(analystCreateApplicationRevisionStatusMutation).toHaveBeenCalledWith(
      undefined,
      {
        input: {
          applicationRevisionStatus: {
            applicationId: query.application.rowId,
            applicationRevisionStatus: decision,
            versionNumber: query.application.applicationRevision.versionNumber,
          },
        },
      }
    );
  });

  it("should enable the ability to change an application decision if user is an admin", () => {
    const query = getTestQuery({
      applicationRevisionStatus: "REJECTED",
      userGroup: INCENTIVE_ADMINISTRATOR,
    });
    const wrapper = shallow(<ApplicationReview router={null} query={query} />);
    const changeDecisionHandler = wrapper
      .find("Relay(ApplicationReviewStepSelector)")
      .prop("changeDecision");
    expect(changeDecisionHandler).toBeDefined();
  });

  it("application decision cannot be changed if a newer draft exists", () => {
    const query = getTestQuery({
      applicationRevisionStatus: "REQUESTED_CHANGES",
      isCurrentVersion: false,
      userGroup: INCENTIVE_ADMINISTRATOR,
    });
    const wrapper = shallow(<ApplicationReview router={null} query={query} />);
    const changeDecisionHandler = wrapper
      .find("Relay(ApplicationReviewStepSelector)")
      .prop("changeDecision");
    expect(changeDecisionHandler).toBeDefined();
    expect(
      wrapper
        .find("Relay(ApplicationReviewStepSelector)")
        .prop("newerDraftExists")
    ).toBeTrue();
  });

  it("renders the HelpButton only when the review sidebar is closed", () => {
    const query = getTestQuery({});
    const wrapper = shallow(<ApplicationReview router={null} query={query} />);
    expect(wrapper.exists("HelpButton")).toBeTrue();
    // Open the sidebar:
    wrapper.setState((state) => {
      return {
        ...state,
        isSidebarOpened: true,
      };
    });
    expect(wrapper.exists("HelpButton")).toBeFalse();
  });

  it("passes the applicationRevision prop to the IncentiveCalculator", () => {
    const query = getTestQuery({});
    const wrapper = shallow(<ApplicationReview router={null} query={query} />);
    expect(
      wrapper
        .find("Relay(IncentiveCalculator)")
        .first()
        .prop("applicationRevision")
    ).toBe(query.application.applicationRevision);
  });
});
