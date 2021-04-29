import React from 'react';
import {shallow} from 'enzyme';
import ApplicationReview from 'pages/analyst/application-review';
import {
  applicationReviewQueryResponse,
  CiipApplicationRevisionStatus
} from 'applicationReviewQuery.graphql';
import {INCENTIVE_ANALYST, INCENTIVE_ADMINISTRATOR} from 'data/group-constants';

const getTestQuery = ({
  applicationRevisionStatus = 'SUBMITTED',
  userGroup = INCENTIVE_ANALYST,
  isCurrentVersion = true
}) => {
  return {
    session: {
      userGroups: [userGroup],
      ' $fragmentRefs': {
        defaultLayout_session: true
      }
    },
    application: {
      ' $fragmentRefs': {
        ApplicationDetailsContainer_application: true
      },
      rowId: 1,
      reviewRevisionStatus: {
        applicationRevisionStatus: applicationRevisionStatus as CiipApplicationRevisionStatus,
        ' $fragmentRefs': {
          ApplicationRevisionStatusContainer_applicationRevisionStatus: true
        }
      },
      applicationReviewStepsByApplicationId: {
        edges: [
          {
            node: {
              id: 'abc',
              ' $fragmentRefs': {
                ReviewSidebar_applicationReviewStep: true
              }
            }
          }
        ],
        ' $fragmentRefs': {
          ApplicationReviewStepSelector_applicationReviewSteps: true
        }
      },
      applicationRevision: {
        id: 'xyz',
        isCurrentVersion,
        versionNumber: 1,
        overrideJustification: null,
        applicationRevisionStatus: {
          id: 'jkl',
          applicationRevisionStatus: applicationRevisionStatus as CiipApplicationRevisionStatus
        },
        ' $fragmentRefs': {
          IncentiveCalculatorContainer_applicationRevision: true,
          ApplicationDetailsContainer_applicationRevision: true
        }
      }
    },
    ' $fragmentRefs': {
      ApplicationDetailsContainer_query: true,
      ApplicationDetailsContainer_diffQuery: true
    }
  };
};

describe('The application-review page', () => {
  it('matches the last snapshot (with review sidebar closed)', () => {
    const query = getTestQuery({});
    const wrapper = shallow(
      <ApplicationReview
        router={null}
        query={query as applicationReviewQueryResponse['query']}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('matches the last snapshot (with review sidebar opened)', () => {
    const query = getTestQuery({});
    const wrapper = shallow(
      <ApplicationReview
        router={null}
        query={query as applicationReviewQueryResponse['query']}
      />
    );
    expect(wrapper.exists('Relay(ReviewSidebar)')).toBeFalse();
    // Open the sidebar:
    wrapper.setState((state) => {
      return {
        ...state,
        isSidebarOpened: true
      };
    });
    expect(wrapper.exists('Relay(ReviewSidebar)')).toBeTrue();
    expect(wrapper.exists('HelpButton')).toBeFalse();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the review step selector and sidebar with non-finalized state if no application decision has been made', () => {
    const query = getTestQuery({applicationRevisionStatus: 'SUBMITTED'});
    const wrapper = shallow(
      <ApplicationReview
        router={null}
        query={query as applicationReviewQueryResponse['query']}
      />
    );
    wrapper.setState((state) => {
      return {
        ...state,
        isSidebarOpened: true
      };
    });
    expect(
      wrapper.find('Relay(ReviewSidebar)').prop('isFinalized')
    ).toBeFalse();
    expect(
      wrapper
        .find('Relay(ApplicationReviewStepSelector)')
        .prop('decisionOrChangeRequestStatus')
    ).toEqual('SUBMITTED');
  });

  it('should render the review step selector and sidebar showing finalized review if an application decision has been made', () => {
    const query = getTestQuery({applicationRevisionStatus: 'APPROVED'});
    const wrapper = shallow(
      <ApplicationReview
        router={null}
        query={query as applicationReviewQueryResponse['query']}
      />
    );
    wrapper.setState((state) => {
      return {
        ...state,
        isSidebarOpened: true
      };
    });
    expect(wrapper.find('Relay(ReviewSidebar)').prop('isFinalized')).toBeTrue();
    expect(
      wrapper
        .find('Relay(ApplicationReviewStepSelector)')
        .prop('decisionOrChangeRequestStatus')
    ).not.toEqual('SUBMITTED');
  });

  it('should enable the ability to change an application decision if user is an admin', () => {
    const query = getTestQuery({
      applicationRevisionStatus: 'REJECTED',
      userGroup: INCENTIVE_ADMINISTRATOR
    });
    const wrapper = shallow(
      <ApplicationReview
        router={null}
        query={query as applicationReviewQueryResponse['query']}
      />
    );
    const changeDecisionHandler = wrapper
      .find('Relay(ApplicationReviewStepSelector)')
      .prop('changeDecision');
    expect(changeDecisionHandler).toBeDefined();
  });

  it('application decision cannot be changed if a newer draft exists', () => {
    const query = getTestQuery({
      applicationRevisionStatus: 'REQUESTED_CHANGES',
      isCurrentVersion: false,
      userGroup: INCENTIVE_ADMINISTRATOR
    });
    const wrapper = shallow(
      <ApplicationReview
        router={null}
        query={query as applicationReviewQueryResponse['query']}
      />
    );
    const changeDecisionHandler = wrapper
      .find('Relay(ApplicationReviewStepSelector)')
      .prop('changeDecision');
    expect(changeDecisionHandler).toBeDefined();
    expect(
      wrapper
        .find('Relay(ApplicationReviewStepSelector)')
        .prop('newerDraftExists')
    ).toBeTrue();
  });

  it('renders the HelpButton only when the review sidebar is closed', () => {
    const query = getTestQuery({});
    const wrapper = shallow(
      <ApplicationReview
        router={null}
        query={query as applicationReviewQueryResponse['query']}
      />
    );
    expect(wrapper.exists('HelpButton')).toBeTrue();
    // Open the sidebar:
    wrapper.setState((state) => {
      return {
        ...state,
        isSidebarOpened: true
      };
    });
    expect(wrapper.exists('HelpButton')).toBeFalse();
  });

  it('passes the applicationRevision prop to the IncentiveCalculator', () => {
    const query = getTestQuery({});
    const wrapper = shallow(
      <ApplicationReview
        router={null}
        query={query as applicationReviewQueryResponse['query']}
      />
    );
    expect(
      wrapper
        .find('Relay(IncentiveCalculator)')
        .first()
        .prop('applicationRevision')
    ).toBe(query.application.applicationRevision);
  });

  it('renders the ApplicationOverrideNotification component if an override has been set', () => {
    const data = getTestQuery({});
    const overrideQuery = {
      ...data,
      application: {
        ...data.application,
        applicationRevision: {
          ...data.application.applicationRevision,
          overrideJustification: 'oops'
        }
      }
    };
    const wrapper = shallow(
      <ApplicationReview
        router={null}
        query={overrideQuery as applicationReviewQueryResponse['query']}
      />
    );
    expect(
      wrapper.find('ApplicationOverrideNotification').props()
    ).toStrictEqual({overrideJustification: 'oops'});
  });
});
