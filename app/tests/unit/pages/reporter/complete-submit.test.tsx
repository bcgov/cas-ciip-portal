import React from 'react';
import {shallow} from 'enzyme';
import CompleteSubmit from 'pages/reporter/complete-submit';
import {completeSubmitQueryResponse} from 'completeSubmitQuery.graphql';

const query: completeSubmitQueryResponse['query'] = {
  session: {
    ' $fragmentRefs': {
      defaultLayout_session: true
    }
  },
  application: {
    facilityByFacilityId: {
      facilityName: 'Super Clean',
      organisationByOrganisationId: {
        operatorName: 'CleanBC Org'
      }
    },
    latestSubmittedRevision: {
      versionNumber: 2
    }
  }
};

const router: any = {
  query: {
    applicationId: 'testing'
  },
  push: jest.fn()
};

describe('Reporter application submission page', () => {
  it('should render properly', () => {
    const wrapper = shallow(<CompleteSubmit router={router} query={query} />);
    expect(wrapper).toMatchSnapshot();
  });
});
