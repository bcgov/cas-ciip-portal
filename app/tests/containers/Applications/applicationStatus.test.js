import React from 'react';
import {mount} from 'enzyme';
import ApplicationStatus from '../../../containers/Applications/ApplicationStatus';
import {queryMock} from '../../../lib/relayQueryMock';

let mockAppQueryData;

describe('Application Status', () => {
  beforeEach(() => {
    // Make sure mock data is always fresh for each test run
    mockAppQueryData = {
      allApplicationStatuses: {
        nodes: [
          {
            applicationStatus: 'pending'
          }
        ]
      }
    };
  });

  it('should receive applicationId as props', async () => {
    queryMock.mockQuery({
      name: 'ApplicationStatusQuery',
      data: mockAppQueryData,
      variables: {
        applicationStatusCondition: {
          formResultId: '1'
        }
      }
    });

    const r = mount(<ApplicationStatus applicationId="1" />);
    expect(r.props().applicationId).toEqual('1');
  });
});
