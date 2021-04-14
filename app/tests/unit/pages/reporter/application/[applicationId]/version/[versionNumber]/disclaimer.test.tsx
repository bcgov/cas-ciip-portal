import React from 'react';
import {shallow} from 'enzyme';
import NewApplicationDisclaimer from 'pages/reporter/application/[applicationId]/version/[versionNumber]/disclaimer';
import {disclaimerNewApplicationQueryResponse} from 'disclaimerNewApplicationQuery.graphql';

const query: disclaimerNewApplicationQueryResponse['query'] = {
  session: {
    ' $fragmentRefs': {
      defaultLayout_session: true
    }
  },
  application: {
    id: 'skjdh839',
    applicationRevisionByStringVersionNumber: {
      ' $fragmentRefs': {
        ApplicationConsent_applicationRevision: true
      },
      legalDisclaimerAccepted: false,
      versionNumber: 1
    },
    latestDraftRevision: {
      versionNumber: 1
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
      wrapper
        .find('Relay(ApplicationConsent)')
        .first()
        .prop('applicationRevision')
    ).toBe(query.application.applicationRevisionByStringVersionNumber);
  });
});
