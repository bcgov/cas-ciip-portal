import React from 'react';
import {shallow} from 'enzyme';
import ViewApplication from 'pages/reporter/view-application';
import {viewApplicationQueryResponse} from 'viewApplicationQuery.graphql';

const query: viewApplicationQueryResponse['query'] = {
  ' $fragmentRefs': {
    ApplicationDetailsContainer_query: true
  },
  session: {
    ' $fragmentRefs': {
      defaultLayout_session: true
    }
  },
  application: {
    latestDraftRevision: {
      versionNumber: 1
    },
    latestSubmittedRevision: {
      versionNumber: 1
    },
    applicationRevisionStatus: {
      applicationRevisionStatus: 'SUBMITTED'
    },
    ' $fragmentRefs': {
      ReviseApplicationButtonContainer_application: true,
      ApplicationDetailsContainer_application: true
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
    },
    reviewCommentsByApplicationId: {
      edges: []
    }
  }
};

describe('View submitted application page', () => {
  it('passes a query to the ApplicationDetailsComponent component', () => {
    const r = shallow(
      <ViewApplication
        query={query}
        router={{
          query: {
            applicationId: 'testing',
            version: '1'
          }
        }}
      />
    );
    expect(
      r.find('Relay(ApplicationDetailsComponent)').first().prop('query')
    ).toBe(query);
  });

  it('does not show an application decision when unreviewed', () => {
    const r = shallow(
      <ViewApplication
        query={{
          ...query,
          application: {
            ...query.application
          }
        }}
        router={{
          query: {
            applicationId: 'testing',
            version: '1'
          }
        }}
      />
    );
    expect(r.find('ApplicationDecision')).toBeEmpty();
    expect(r).toMatchSnapshot();
  });

  it('shows approval when reviewed and approved', () => {
    const decision = 'APPROVED';
    const r = shallow(
      <ViewApplication
        query={{
          ...query,
          application: {
            ...query.application,
            latestDraftRevision: {
              versionNumber: 1
            },
            latestSubmittedRevision: {
              versionNumber: 1
            },
            applicationRevisionStatus: {
              applicationRevisionStatus: decision
            }
          }
        }}
        router={{
          query: {
            applicationId: 'testing',
            version: '1'
          }
        }}
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
    ).toBeEmpty();
    expect(r).toMatchSnapshot();
  });

  it('shows rejection when reviewed and rejected', () => {
    const decision = 'REJECTED';
    const r = shallow(
      <ViewApplication
        query={{
          ...query,
          application: {
            ...query.application,
            latestDraftRevision: {
              versionNumber: 1
            },
            latestSubmittedRevision: {
              versionNumber: 1
            },
            applicationRevisionStatus: {
              applicationRevisionStatus: decision
            }
          }
        }}
        router={{
          query: {
            applicationId: 'testing',
            version: '1'
          }
        }}
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
    ).toBeEmpty();
    expect(r).toMatchSnapshot();
  });

  it('shows reviewer comments when reviewed and rejected', () => {
    const decision = 'REJECTED';
    const comments = [
      'We cannot accept applications from facilities that are either not regulated under GGIRCA, or which paid no carbon tax in 2020.'
    ];
    const r = shallow(
      <ViewApplication
        query={{
          ...query,
          application: {
            ...query.application,
            latestDraftRevision: {
              versionNumber: 1
            },
            latestSubmittedRevision: {
              versionNumber: 1
            },
            applicationRevisionStatus: {
              applicationRevisionStatus: decision
            },
            reviewCommentsByApplicationId: {
              edges: [
                {
                  node: {
                    description: comments[0],
                    resolved: false,
                    commentType: 'GENERAL'
                  }
                }
              ]
            }
          }
        }}
        router={{
          query: {
            applicationId: 'testing',
            version: '1'
          }
        }}
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
    const r = shallow(
      <ViewApplication
        query={{
          ...query,
          application: {
            ...query.application,
            latestDraftRevision: {
              versionNumber: 1
            },
            latestSubmittedRevision: {
              versionNumber: 1
            },
            applicationRevisionStatus: {
              applicationRevisionStatus: decision
            },
            reviewCommentsByApplicationId: {
              edges: [
                {
                  node: {
                    description: comments[0],
                    resolved: false,
                    commentType: 'GENERAL'
                  }
                }
              ]
            }
          }
        }}
        router={{
          query: {
            applicationId: 'testing',
            version: '1'
          }
        }}
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
    const r = shallow(
      <ViewApplication
        query={{
          ...query,
          application: {
            ...query.application,
            latestDraftRevision: {
              versionNumber: 2
            },
            latestSubmittedRevision: {
              versionNumber: 1
            },
            applicationRevisionStatus: {
              applicationRevisionStatus: 'REQUESTED_CHANGES'
            },
            reviewCommentsByApplicationId: {
              edges: [
                {
                  node: {
                    description: 'This is a comment',
                    resolved: false,
                    commentType: 'GENERAL'
                  }
                }
              ]
            }
          }
        }}
        router={{
          query: {
            applicationId: 'testing',
            version: '1'
          }
        }}
      />
    );
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').text()).toBe('Resume latest draft');
    expect(r).toMatchSnapshot();
  });

  it('should render a "View most recent submission" button when viewing an older submission (viewed version < last submitted version)', () => {
    const r = shallow(
      <ViewApplication
        query={{
          ...query,
          application: {
            ...query.application,
            latestDraftRevision: {
              versionNumber: 2
            },
            latestSubmittedRevision: {
              versionNumber: 2
            },
            applicationRevisionStatus: {
              applicationRevisionStatus: 'REQUESTED_CHANGES'
            },
            reviewCommentsByApplicationId: {
              edges: [
                {
                  node: {
                    description: 'This is a comment',
                    resolved: false,
                    commentType: 'GENERAL'
                  }
                }
              ]
            }
          }
        }}
        router={{
          query: {
            applicationId: 'testing',
            version: '1'
          }
        }}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').text()).toBe('View most recent submission');
  });

  it('should render a "View most recent submission" button when viewing an older submission that has BOTH a newer submission, and at least two newer drafts', () => {
    const r = shallow(
      <ViewApplication
        query={{
          ...query,
          application: {
            ...query.application,
            latestDraftRevision: {
              versionNumber: 3
            },
            latestSubmittedRevision: {
              versionNumber: 2
            },
            applicationRevisionStatus: {
              applicationRevisionStatus: 'REQUESTED_CHANGES'
            },
            reviewCommentsByApplicationId: {
              edges: [
                {
                  node: {
                    description: 'This is a comment',
                    resolved: false,
                    commentType: 'GENERAL'
                  }
                }
              ]
            }
          }
        }}
        router={{
          query: {
            applicationId: 'testing',
            version: '1'
          }
        }}
      />
    );
    expect(r).toMatchSnapshot();
    expect(r.exists('Button')).toBe(true);
    expect(r.find('Button').text()).toBe('View most recent submission');
  });
});
