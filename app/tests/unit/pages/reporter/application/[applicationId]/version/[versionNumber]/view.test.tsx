import React from 'react';
import {shallow} from 'enzyme';
import ViewApplication from 'pages/reporter/application/[applicationId]/version/[versionNumber]/view';
import {viewApplicationQueryResponse} from 'viewApplicationQuery.graphql';

const getTestQuery = (options?) => {
  return {
    ' $fragmentRefs': {
      ApplicationDetailsContainer_query: true
    },
    session: {
      ' $fragmentRefs': {
        defaultLayout_session: true
      }
    },
    application: {
      rowId: 1,
      facilityByFacilityId: {
        bcghgid: '123456'
      },
      latestDraftRevision: {
        versionNumber: 1
      },
      latestSubmittedRevision: {
        versionNumber: 1
      },
      applicationRevisionStatus: {
        applicationRevisionStatus:
          options?.applicationRevisionStatus || 'SUBMITTED'
      },
      applicationReviewStepsByApplicationId: {
        edges: [
          {
            node: {
              reviewCommentsByApplicationReviewStepId: {
                edges: [
                  {
                    node: {
                      description: options?.comment || 'This is a comment.'
                    }
                  }
                ]
              }
            }
          }
        ]
      },
      ' $fragmentRefs': {
        ReviseApplicationButtonContainer_application: true,
        ApplicationDetailsContainer_application: true
      }
    }
  };
};

const router: any = {
  query: {
    applicationId: 'testing',
    versionNumber: '1'
  },
  push: jest.fn()
};

describe('View submitted application page', () => {
  it('passes a query to the ApplicationDetailsComponent component', () => {
    const data = getTestQuery();
    const r = shallow(
      <ViewApplication
        query={data as viewApplicationQueryResponse['query']}
        router={router}
      />
    );
    expect(
      r.find('Relay(ApplicationDetailsComponent)').first().prop('query')
    ).toBe(data);
  });

  it('redirects to the 404 page if the application is missing', () => {
    const data = {
      ...getTestQuery(),
      application: null
    };
    const r = shallow(
      <ViewApplication
        query={data as viewApplicationQueryResponse['query']}
        router={router}
      />
    );
    expect(r).toBeEmpty();
    expect(router.push).toBeCalledWith('/404');
  });

  it('does not show an application decision when unreviewed', () => {
    const data = getTestQuery();
    const r = shallow(
      <ViewApplication
        query={data as viewApplicationQueryResponse['query']}
        router={router}
      />
    );
    expect(r.find('ApplicationDecision')).toBeEmpty();
    expect(r).toMatchSnapshot();
  });

  it('shows approval when reviewed and approved', () => {
    const decision = 'APPROVED';
    const data = getTestQuery({applicationRevisionStatus: decision});
    const r = shallow(
      <ViewApplication
        query={data as viewApplicationQueryResponse['query']}
        router={router}
      />
    );
    expect(r.find('ApplicationDecision').first().prop('decision')).toBe(
      decision
    );
    expect(
      r.find('ApplicationDecision').first().prop('actionRequired')
    ).toBeFalse();
    expect(r).toMatchSnapshot();
  });

  it('shows rejection when reviewed and rejected', () => {
    const decision = 'REJECTED';
    const data = getTestQuery({applicationRevisionStatus: decision});
    const r = shallow(
      <ViewApplication
        query={data as viewApplicationQueryResponse['query']}
        router={router}
      />
    );
    expect(r.find('ApplicationDecision').first().prop('decision')).toBe(
      decision
    );
    expect(
      r.find('ApplicationDecision').first().prop('actionRequired')
    ).toBeFalse();
    expect(r).toMatchSnapshot();
  });

  it('shows reviewer comments when reviewed and rejected', () => {
    const decision = 'REJECTED';
    const comments = [
      'We cannot accept applications from facilities that are either not regulated under GGIRCA, or which paid no carbon tax in 2020.'
    ];
    const data = getTestQuery({
      applicationRevisionStatus: decision,
      comment: comments[0]
    });
    const r = shallow(
      <ViewApplication
        query={data as viewApplicationQueryResponse['query']}
        router={router}
      />
    );
    expect(r.find('ApplicationDecision').first().prop('decision')).toBe(
      decision
    );
    expect(
      r.find('ApplicationDecision').first().prop('actionRequired')
    ).toBeFalse();
    expect(
      r.find('ApplicationDecision').first().prop('reviewComments')
    ).toBeArrayOfSize(1);
    expect(
      r.find('ApplicationDecision').first().prop('reviewComments')[0]
    ).toBe(comments[0]);
    expect(r).toMatchSnapshot();
  });

  it('displays a "Revise" button when changes are requested, and there is no newer revision', () => {
    const decision = 'REQUESTED_CHANGES';
    const comments = [
      'The operator name is slightly different from a previous match we have on file: should it be "Virtucon Limited" instead of "Virtucon Ltd"?'
    ];
    const data = getTestQuery({
      applicationRevisionStatus: decision,
      comment: comments[0]
    });
    const r = shallow(
      <ViewApplication
        query={data as viewApplicationQueryResponse['query']}
        router={router}
      />
    );
    expect(r.find('ApplicationDecision').first().prop('decision')).toBe(
      decision
    );
    expect(
      r.find('ApplicationDecision').first().prop('actionRequired')
    ).toBeTrue();
    expect(
      r.find('ApplicationDecision').first().prop('reviewComments')
    ).toBeArrayOfSize(1);
    expect(
      r.find('ApplicationDecision').first().prop('reviewComments')[0]
    ).toBe(comments[0]);
    expect(r).toMatchSnapshot();
  });

  it('displays a "Resume latest draft" button when changes are requested, and there is already a newer draft (not submitted)', () => {
    const data = getTestQuery({applicationRevisionStatus: 'REQUESTED_CHANGES'});
    const query = {
      ...data,
      application: {
        ...data.application,
        latestDraftRevision: {
          versionNumber: 2
        }
      }
    };
    const r = shallow(
      <ViewApplication
        query={query as viewApplicationQueryResponse['query']}
        router={router}
      />
    );
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').text()).toBe('Resume latest draft');
    expect(r).toMatchSnapshot();
  });

  it('should render a "View most recent submission" button when viewing an older submission (viewed version < last submitted version)', () => {
    const data = getTestQuery({applicationRevisionStatus: 'REQUESTED_CHANGES'});
    const query = {
      ...data,
      application: {
        ...data.application,
        latestDraftRevision: {
          versionNumber: 2
        },
        latestSubmittedRevision: {
          versionNumber: 2
        }
      }
    };
    const r = shallow(
      <ViewApplication
        query={query as viewApplicationQueryResponse['query']}
        router={router}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').text()).toBe('View most recent submission');
  });

  it('should render a "View most recent submission" button when viewing an older submission that has BOTH a newer submission, and at least two newer drafts', () => {
    const data = getTestQuery({applicationRevisionStatus: 'REQUESTED_CHANGES'});
    const query = {
      ...data,
      application: {
        ...data.application,
        latestDraftRevision: {
          versionNumber: 3
        },
        latestSubmittedRevision: {
          versionNumber: 2
        }
      }
    };
    const r = shallow(
      <ViewApplication
        query={query as viewApplicationQueryResponse['query']}
        router={router}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').text()).toBe('View most recent submission');
  });
});
