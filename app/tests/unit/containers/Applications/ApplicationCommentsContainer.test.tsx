import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationCommentsComponent} from 'containers/Applications/ApplicationCommentsContainer';

describe('ApplicationCommentsComponent', () => {
  it('should match the snapshot with the ApplicationCommentsComponent component', async () => {
    const renderer = shallow(
      <ApplicationCommentsComponent
        relay={null}
        query={{
          ' $refType': 'ApplicationCommentsContainer_query',
          application: {
            formResultsByApplicationId: {
              edges: [
                {
                  node: {
                    id: 'WyJmb3JtX3Jlc3VsdHMiLDExXQ==',
                    formJsonByFormId: {
                      name: 'Administration Data'
                    },
                    applicationReviewsByFormResultId: {
                      edges: [
                        {
                          node: {
                            id: 'WyJhcHBsaWNhdGlvbl9yZXZpZXdzIiwxMV0=',
                            reviewStatus: 'REQUESTED_CHANGES',
                            createdAt: '2019-11-28',
                            reviewCommentsByApplicationReviewId: {
                              edges: [
                                {
                                  node: {
                                    id: 'WyJyZXZpZXdfY29tbWVudHMiLDFd',
                                    description:
                                      'Legal name is wrong. Change it to ARBUTUS',
                                    createdAt: '2019-11-28'
                                  }
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        }}
      />
    );
    expect(renderer).toMatchSnapshot();
  });
});
