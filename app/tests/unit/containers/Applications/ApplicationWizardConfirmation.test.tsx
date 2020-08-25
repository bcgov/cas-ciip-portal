import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationWizardConfirmationComponent} from 'containers/Applications/ApplicationWizardConfirmation';

describe('The Confirmation Component', () => {
  it('match the snapshot', () => {
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query'
        }}
        application={{
          ' $refType': 'ApplicationWizardConfirmation_application',
          ' $fragmentRefs': {
            SubmitApplication_application: true,
            ApplicationDetailsContainer_application: true
          },
          id: 'abc',
          rowId: 1,
          latestDraftRevision: {
            id: 'abc',
            versionNumber: 1,
            certificationSignatureIsValid: false,
            certificationUrl: undefined,
            overrideJustification: null
          }
        }}
        relay={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should show the Generate Confirmation Page dialog when certificationUrl is undefined', () => {
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query'
        }}
        application={{
          ' $refType': 'ApplicationWizardConfirmation_application',
          ' $fragmentRefs': {
            SubmitApplication_application: true,
            ApplicationDetailsContainer_application: true
          },
          id: 'abc',
          rowId: 1,
          latestDraftRevision: {
            id: 'abc',
            versionNumber: 1,
            certificationSignatureIsValid: false,
            certificationUrl: undefined,
            overrideJustification: null
          }
        }}
        relay={null}
      />
    );
    expect(wrapper.find('CardHeader').at(0).text()).toBe(
      'Application Certification'
    );
    expect(wrapper.find('Button').last().text()).toBe(
      'Submit for Certification'
    );
  });

  it('should show the Submit application dialog when certificationSignatureIsvalid is true', () => {
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query'
        }}
        application={{
          ' $refType': 'ApplicationWizardConfirmation_application',
          ' $fragmentRefs': {
            SubmitApplication_application: true,
            ApplicationDetailsContainer_application: true
          },
          id: 'abc',
          rowId: 1,
          latestDraftRevision: {
            id: 'abc',
            versionNumber: 1,
            certificationSignatureIsValid: true,
            certificationUrl: {
              id: 'abc',
              certificationSignature: 'signed',
              hashMatches: true,
              certifierUrl: 'jkl'
            },
            overrideJustification: null
          }
        }}
        relay={null}
      />
    );
    expect(wrapper.find('Relay(SubmitApplicationComponent)').exists()).toBe(
      true
    );
  });

  it('should show a "data has changed" dialogue when hashMatches is false but a signature exists', () => {
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query'
        }}
        application={{
          ' $refType': 'ApplicationWizardConfirmation_application',
          ' $fragmentRefs': {
            SubmitApplication_application: true,
            ApplicationDetailsContainer_application: true
          },
          id: 'abc',
          rowId: 1,
          latestDraftRevision: {
            id: 'abc',
            versionNumber: 1,
            certificationSignatureIsValid: false,
            certificationUrl: {
              id: 'abc',
              certificationSignature: 'signed',
              hashMatches: false,
              certifierUrl: 'jkl'
            },
            overrideJustification: null
          }
        }}
        relay={null}
      />
    );

    expect(wrapper.find('CardHeader').at(0).text()).toBe('Error');
    expect(wrapper).toMatchSnapshot();
  });

  it('should show a certifier has not yet signed message when hashMatches is true but certificationSignature is null', () => {
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query'
        }}
        application={{
          ' $refType': 'ApplicationWizardConfirmation_application',
          ' $fragmentRefs': {
            SubmitApplication_application: true,
            ApplicationDetailsContainer_application: true
          },
          id: 'abc',
          rowId: 1,
          latestDraftRevision: {
            id: 'abc',
            versionNumber: 1,
            certificationSignatureIsValid: false,
            certificationUrl: {
              id: 'abc',
              certificationSignature: undefined,
              hashMatches: true,
              certifierUrl: 'jkl'
            },
            overrideJustification: null
          }
        }}
        relay={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('CardBody').find('p').at(0).text()).toBe(
      'Your application is pending verification by the certifying official you indicated. You will be notified when they have certified the application, at which time it can be submitted.'
    );
  });

  it('should render the override justification component with the right props if no override is currently set', () => {
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query'
        }}
        application={{
          ' $refType': 'ApplicationWizardConfirmation_application',
          ' $fragmentRefs': {
            SubmitApplication_application: true,
            ApplicationDetailsContainer_application: true
          },
          id: 'abc',
          rowId: 1,
          latestDraftRevision: {
            id: 'abc',
            versionNumber: 1,
            certificationSignatureIsValid: false,
            certificationUrl: undefined,
            overrideJustification: null
          }
        }}
        relay={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find('Relay(ApplicationOverrideJustificationComponent)')
        .prop('applicationOverrideJustification')
    ).toBe(null);
    expect(
      wrapper
        .find('Relay(ApplicationOverrideJustificationComponent)')
        .prop('overrideActive')
    ).toBe(false);
  });

  it('should render the override justification component with the right props if an override is currently set', () => {
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query'
        }}
        application={{
          ' $refType': 'ApplicationWizardConfirmation_application',
          ' $fragmentRefs': {
            SubmitApplication_application: true,
            ApplicationDetailsContainer_application: true
          },
          id: 'abc',
          rowId: 1,
          latestDraftRevision: {
            id: 'abc',
            versionNumber: 1,
            certificationSignatureIsValid: false,
            certificationUrl: undefined,
            overrideJustification: 'I did a bad thing and I dont want to fix it'
          }
        }}
        relay={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find('Relay(ApplicationOverrideJustificationComponent)')
        .prop('applicationOverrideJustification')
    ).toBe('I did a bad thing and I dont want to fix it');
    expect(
      wrapper
        .find('Relay(ApplicationOverrideJustificationComponent)')
        .prop('overrideActive')
    ).toBe(true);
  });
});
