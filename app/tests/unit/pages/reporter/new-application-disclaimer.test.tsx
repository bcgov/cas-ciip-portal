import React from 'react';
import {shallow} from 'enzyme';
import NewApplicationDisclaimer from 'pages/reporter/new-application-disclaimer';
import {newApplicationDisclaimerQueryResponse} from 'newApplicationDisclaimerQuery.graphql';

const query: newApplicationDisclaimerQueryResponse['query'] = {
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
  it('matches the last accepted Snapshot', () => {
    const wrapper = shallow(
      <NewApplicationDisclaimer query={query} router={router} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('passes an application to the ApplicationConsent component', () => {
    const wrapper = shallow(
      <NewApplicationDisclaimer query={query} router={router} />
    );
    expect(
      wrapper.find('Relay(ApplicationConsent)').first().prop('application')
    ).toBe(query.application);
  });
});
