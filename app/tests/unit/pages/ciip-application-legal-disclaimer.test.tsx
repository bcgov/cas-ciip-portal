import React from 'react';
import {shallow} from 'enzyme';
import CiipApplicationLegalDisclaimer from 'pages/reporter/ciip-application-legal-disclaimer';
import {ciipApplicationLegalDisclaimerQueryResponse} from 'ciipApplicationLegalDisclaimerQuery.graphql';

const query: ciipApplicationLegalDisclaimerQueryResponse['query'] = {
  session: {
    ' $fragmentRefs': {
      defaultLayout_session: true
    }
  },
  application: {
    ' $fragmentRefs': {
      ApplicationConsent_application: true
    }
  }
};

const router = {
  query: {
    applicationId: 'skjdh839',
    hasSwrsReport: true,
    version: 1
  }
};

describe('Interstitial application legal disclaimer page', () => {
  it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(
      <CiipApplicationLegalDisclaimer query={query} router={router} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('It passes an application to the ApplicationConsent component', () => {
    const wrapper = shallow(
      <CiipApplicationLegalDisclaimer query={query} router={router} />
    );
    expect(
      wrapper.find('Relay(ApplicationConsent)').first().prop('application')
    ).toBe(query.application);
  });
});
