import React from 'react';
import {shallow} from 'enzyme';
import ApplicationReview from 'pages/analyst/application-review';
import {applicationReviewQueryResponse} from 'applicationReviewQuery.graphql';

const getTestQuery = () => {
  return {
    session: {
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
        ' $fragmentRefs': {
          ApplicationRevisionStatusContainer_applicationRevisionStatus: true
        }
      },
      applicationReviewStepsByApplicationId: {
        edges: [
          {
            node: {
              ' $fragmentRefs': {
                ReviewSidebar_applicationReviewStep: true
              }
            }
          }
        ]
      }
    },
    applicationRevision: {
      overrideJustification: null,
      ' $fragmentRefs': {
        IncentiveCalculatorContainer_applicationRevision: true
      }
    },
    ' $fragmentRefs': {
      ApplicationDetailsContainer_query: true
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
    wrapper
      .find('button')
      .filterWhere((n) => n.text() === 'Click to toggle review comments')
      .simulate('click');
    expect(wrapper.exists('Relay(ReviewSidebar)')).toBeTrue();
    expect(wrapper.exists('HelpButton')).toBeFalse();
    expect(wrapper).toMatchSnapshot();
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
    wrapper
      .find('button')
      .filterWhere((n) => n.text() === 'Click to toggle review comments')
      .simulate('click');
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
          IncentiveCalculatorContainer_applicationRevision: true
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
