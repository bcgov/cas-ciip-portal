import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationDetailsComponent} from 'containers/Applications/ApplicationDetailsContainer';

describe('ApplicationDetailsComponent', () => {
  it('should match the snapshot with the ApplicationDetails component', async () => {
    const renderer = shallow(
      <ApplicationDetailsComponent
        review={false}
        relay={null}
        query={{
          ' $refType': 'ApplicationDetailsContainer_query',
          query: {
            ' $fragmentRefs': {
              ApplicationDetailsCardItem_query: true
            }
          },
          old: {
            orderedFormResults: {
              edges: [
                {
                  node: {
                    id: 'abc',
                    versionNumber: 0,
                    formJsonByFormId: {
                      slug: 'admin'
                    },
                    formResult: null
                  }
                }
              ]
            }
          },
          new: {
            orderedFormResults: {
              edges: [
                {
                  node: {
                    id: 'abc',
                    versionNumber: 2,
                    formJsonByFormId: {
                      slug: 'admin'
                    },
                    formResult: null
                  }
                }
              ]
            }
          }
        }}
        application={{
          ' $refType': 'ApplicationDetailsContainer_application',
          id: 'abc',
          orderedFormResults: {
            edges: [
              {
                node: {
                  id: 'WyJmb3JtX3Jlc3VsdHMiLDExXQ==',
                  versionNumber: 2,
                  ' $fragmentRefs': {
                    ApplicationDetailsCardItem_formResult: true
                  }
                }
              }
            ]
          },
          latestSubmittedRevision: {
            versionNumber: 2
          },
          applicationRevisionsByApplicationId: {
            totalCount: 3,
            edges: [
              {
                node: {
                  id: 'asdfgasd0',
                  versionNumber: 0
                }
              }
            ]
          }
        }}
      />
    );
    expect(renderer).toMatchSnapshot();
  });
  it('should not render the `show diff` checkbox if review=false', async () => {
    const renderer = shallow(
      <ApplicationDetailsComponent
        review={false}
        relay={null}
        query={{
          ' $refType': 'ApplicationDetailsContainer_query',
          query: {
            ' $fragmentRefs': {
              ApplicationDetailsCardItem_query: true
            }
          },
          old: {
            orderedFormResults: {
              edges: [
                {
                  node: {
                    id: 'abc',
                    versionNumber: 0,
                    formJsonByFormId: {
                      slug: 'admin'
                    },
                    formResult: null
                  }
                }
              ]
            }
          },
          new: {
            orderedFormResults: {
              edges: [
                {
                  node: {
                    id: 'abc',
                    versionNumber: 2,
                    formJsonByFormId: {
                      slug: 'admin'
                    },
                    formResult: null
                  }
                }
              ]
            }
          }
        }}
        application={{
          ' $refType': 'ApplicationDetailsContainer_application',
          id: 'abc',
          orderedFormResults: {
            edges: [
              {
                node: {
                  id: 'WyJmb3JtX3Jlc3VsdHMiLDExXQ==',
                  versionNumber: 2,
                  ' $fragmentRefs': {
                    ApplicationDetailsCardItem_formResult: true
                  }
                }
              }
            ]
          },
          latestSubmittedRevision: {
            versionNumber: 2
          },
          applicationRevisionsByApplicationId: {
            totalCount: 3,
            edges: [
              {
                node: {
                  id: 'asdfgasd0',
                  versionNumber: 0
                }
              }
            ]
          }
        }}
      />
    );
    expect(renderer.find('FormCheck').length).toBe(0);
  });
  it('should render the `show diff` checkbox if review=true', async () => {
    const renderer = shallow(
      <ApplicationDetailsComponent
        review
        relay={null}
        query={{
          ' $refType': 'ApplicationDetailsContainer_query',
          query: {
            ' $fragmentRefs': {
              ApplicationDetailsCardItem_query: true
            }
          },
          old: {
            orderedFormResults: {
              edges: [
                {
                  node: {
                    id: 'abc',
                    versionNumber: 0,
                    formJsonByFormId: {
                      slug: 'admin'
                    },
                    formResult: null
                  }
                }
              ]
            }
          },
          new: {
            orderedFormResults: {
              edges: [
                {
                  node: {
                    id: 'abc',
                    versionNumber: 2,
                    formJsonByFormId: {
                      slug: 'admin'
                    },
                    formResult: null
                  }
                }
              ]
            }
          }
        }}
        application={{
          ' $refType': 'ApplicationDetailsContainer_application',
          id: 'abc',
          orderedFormResults: {
            edges: [
              {
                node: {
                  id: 'WyJmb3JtX3Jlc3VsdHMiLDExXQ==',
                  versionNumber: 2,
                  ' $fragmentRefs': {
                    ApplicationDetailsCardItem_formResult: true
                  }
                }
              }
            ]
          },
          latestSubmittedRevision: {
            versionNumber: 2
          },
          applicationRevisionsByApplicationId: {
            totalCount: 3,
            edges: [
              {
                node: {
                  id: 'asdfgasd0',
                  versionNumber: 0
                }
              }
            ]
          }
        }}
      />
    );
    expect(renderer.find('FormCheck').length).toBe(1);
  });
});
