import React from 'react';
import {shallow} from 'enzyme';
import Certify from 'pages/certifier/certify';

const query = {
  session: {
    ciipUserBySub: {
      id: 'abc',
      firstName: 'max',
      lastName: 'powers'
    },
    ' $fragmentRefs': {
      defaultLayout_session: true
    }
  },
  ' $fragmentRefs': {
    ApplicationDetailsContainer_query: true
  },
  application: {
    latestDraftRevision: {
      certificationUrl: {
        certificationSignature: 'test',
        hashMatches: true,
        ' $fragmentRefs': {
          ApplicationRecertificationContainer_certificationUrl: true
        }
      }
    },
    ' $fragmentRefs': {
      CertificationSignature_application: true,
      ApplicationDetailsContainer_application: true
    }
  }
};

// It matches the last accepted Snapshot
it('It matches the last accepted Snapshot', () => {
  const wrapper = shallow(<Certify query={query} />);
  expect(wrapper).toMatchSnapshot();
});

it('It loads the summary component & passes it the application prop if hashMatches is true', () => {
  const wrapper = shallow(<Certify query={query} />);
  expect(
    wrapper.find('Relay(ApplicationDetailsComponent)').prop('application')
  ).toBe(query.application);
});

it('It renders ApplicationRecertificationContainer if hashMatches is false', () => {
  query.application.latestDraftRevision.certificationUrl.hashMatches = false;
  const wrapper = shallow(<Certify query={query} />);
  expect(wrapper).toMatchSnapshot();
  expect(
    wrapper.find('Relay(ApplicationRecertification)').prop('certificationUrl')
  ).toBe(query.application.latestDraftRevision.certificationUrl);
});
