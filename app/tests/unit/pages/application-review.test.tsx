import React from 'react';
import {shallow} from 'enzyme';
import ApplicationReview from 'pages/application-review';
import {applicationReviewQueryResponse} from 'applicationReviewQuery.graphql';

describe('The application-review page', () => {
  const query: applicationReviewQueryResponse['query'] = {
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
      applicationRevisionStatus: {
        ' $fragmentRefs': {
          ApplicationRevisionStatusContainer_applicationRevisionStatus: true
        }
      }
    },
    applicationRevision: {
      ' $fragmentRefs': {
        IncentiveCalculatorContainer_applicationRevision: true
      }
    },
    ' $fragmentRefs': {
      ApplicationCommentsContainer_query: true,
      ApplicationDetailsContainer_query: true
    }
  };

  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(<ApplicationReview router={null} query={query} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('It passes the applicationRevision prop to the IncentiveCalculator', () => {
    const wrapper = shallow(<ApplicationReview router={null} query={query} />);
    expect(
      wrapper
        .find('Relay(IncentiveCalculator)')
        .first()
        .prop('applicationRevision')
    ).toBe(query.applicationRevision);
  });
});
