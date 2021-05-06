import React from 'react';
import {shallow} from 'enzyme';
import Link from 'next/link';
import CompleteSubmit from 'pages/reporter/complete-submit';
import {completeSubmitQueryResponse} from 'completeSubmitQuery.graphql';
import {getViewApplicationPageRoute} from 'routes';

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

  it('should display the facility and operator name', () => {
    const wrapper = shallow(<CompleteSubmit router={router} query={query} />);
    const lead = wrapper.find('.lead').text();

    expect(lead).toContain('Super Clean');
    expect(lead).toContain('CleanBC Org');
  });

  it('should link to the latest submitted application revision', () => {
    const wrapper = shallow(<CompleteSubmit router={router} query={query} />);
    const link = wrapper.find(Link);

    expect(link.prop('href')).toEqual(
      getViewApplicationPageRoute('testing', 2)
    );
  });
});
