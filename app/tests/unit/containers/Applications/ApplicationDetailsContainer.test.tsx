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
          ' $fragmentRefs': {
            ApplicationDetailsPdf_query: true
          },
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
          },
          ' $fragmentRefs': {
            ApplicationDetailsPdf_application: true
          }
        }}
      />
    );
    expect(renderer).toMatchSnapshot();
  });
});
