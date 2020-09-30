import React from 'react';
import {shallow} from 'enzyme';
import Certify from 'pages/certifier/certify';

describe('The certify page', () => {
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
        certificationSignatureIsValid: true,
        certificationUrl: {
          certificationSignature: 'test',
          hashMatches: true,
          ' $fragmentRefs': {
            ApplicationRecertificationContainer_certificationUrl: true
          }
        },
        overrideJustification: null
      },
      ' $fragmentRefs': {
        CertificationSignature_application: true,
        ApplicationDetailsContainer_application: true
      }
    }
  };

  // It matches the last accepted Snapshot
  it('matches the last accepted Snapshot', () => {
    const wrapper = shallow(<Certify query={query} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('loads the summary component & passes it the application prop if hashMatches is true', () => {
    const wrapper = shallow(<Certify query={query} />);
    expect(
      wrapper.find('Relay(ApplicationDetailsComponent)').prop('application')
    ).toBe(query.application);
  });

  it('renders an application certified message instead of the ApplicationSignature component if certification signature is valid', () => {
    const wrapper = shallow(<Certify query={query} />);
    expect(wrapper.find('Alert').text()).toBe('Application has been certified');
  });

  it('renders ApplicationRecertificationContainer if hashMatches is false', () => {
    query.application.latestDraftRevision.certificationUrl.hashMatches = false;
    const wrapper = shallow(<Certify query={query} />);
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper.find('Relay(ApplicationRecertification)').prop('certificationUrl')
    ).toBe(query.application.latestDraftRevision.certificationUrl);
  });

  it('renders the ApplicationOverrideNotification component if an override has been set', () => {
    const overrideQuery = {
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
          },
          overrideJustification: 'oops'
        },
        ' $fragmentRefs': {
          CertificationSignature_application: true,
          ApplicationDetailsContainer_application: true
        }
      }
    };
    const wrapper = shallow(<Certify query={overrideQuery} />);
    expect(
      wrapper.find('ApplicationOverrideNotification').props()
    ).toStrictEqual({overrideJustification: 'oops'});
  });
});
