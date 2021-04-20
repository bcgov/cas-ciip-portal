import React from 'react';
import {shallow} from 'enzyme';
import ApplicationReview from 'pages/analyst/application-review';
import {
  applicationReviewQueryResponse,
  CiipApplicationRevisionStatus
} from 'applicationReviewQuery.graphql';
import {INCENTIVE_ANALYST} from 'data/group-constants';

const getTestQuery = (applicationRevisionStatus = 'SUBMITTED') => {
  return {
    session: {
      userGroups: [INCENTIVE_ANALYST],
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
      }
    },
    applicationRevision: {
      overrideJustification: null,
      ' $fragmentRefs': {
        IncentiveCalculatorContainer_applicationRevision: true,
        ApplicationDetailsContainer_applicationRevision: true
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
    const query = getTestQuery();
    const wrapper = shallow(
      <ApplicationReview
        router={null}
        query={query as applicationReviewQueryResponse['query']}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('matches the last snapshot (with review sidebar opened)', () => {
    const query = getTestQuery();
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

  it('should render the ReviewSidebar with finalized review if an application decision has been made', () => {
    const query = getTestQuery('APPROVED');
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
  });

  it('should render the ReviewSidebar in a non-finalized state if no decision has been made on the application', () => {
    const query = getTestQuery('SUBMITTED');
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
  });

  it('renders the HelpButton only when the review sidebar is closed', () => {
    const query = getTestQuery();
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
    const query = getTestQuery();
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
    ).toBe(query.applicationRevision);
  });

  it('renders the ApplicationOverrideNotification component if an override has been set', () => {
    const overrideQuery = {
      ...getTestQuery(),
      applicationRevision: {
        overrideJustification: 'oops',
        ' $fragmentRefs': {
          IncentiveCalculatorContainer_applicationRevision: true,
          ApplicationDetailsContainer_applicationRevision: true
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
