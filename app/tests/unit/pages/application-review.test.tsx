import React from 'react';
import {shallow} from 'enzyme';
import ApplicationReview from 'pages/analyst/application-review';
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
      reviewRevisionStatus: {
        ' $fragmentRefs': {
          ApplicationRevisionStatusContainer_applicationRevisionStatus: true
        }
      },
      orderedFormResults: {
        edges: [
          {
            node: {
              id: 'abc',
              ' $fragmentRefs': {
                ApplicationCommentsContainer_formResult: true
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

  it('It renders the ApplicationOverrideNotification component if an override has been set', () => {
    const overrideQuery: applicationReviewQueryResponse['query'] = {
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
        orderedFormResults: {
          edges: [
            {
              node: {
                id: 'abc',
                ' $fragmentRefs': {
                  ApplicationCommentsContainer_formResult: true
                }
              }
            }
          ]
        }
      },
      applicationRevision: {
        overrideJustification: 'oops',
        ' $fragmentRefs': {
          IncentiveCalculatorContainer_applicationRevision: true
        }
      },
      ' $fragmentRefs': {
        ApplicationDetailsContainer_query: true
      }
    };
    const wrapper = shallow(
      <ApplicationReview router={null} query={overrideQuery} />
    );
    expect(
      wrapper
        .find('ApplicationOverrideNotification')
        .props('overrideJustification')
    ).toStrictEqual({overrideJustification: 'oops'});
  });
});
