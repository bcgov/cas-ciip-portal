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
            versionNumber: 1,
            certificationSignatureIsValid: false,
            certificationUrl: undefined
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
            versionNumber: 1,
            certificationSignatureIsValid: false,
            certificationUrl: undefined
          }
        }}
        relay={null}
      />
    );
    expect(wrapper.find('h5').at(1).text()).toBe(
      'Thank you for reviewing the application information. You may now send a generated Certification url to be signed prior to submission.'
    );
    expect(wrapper.find('Button').at(0).text()).toBe('Send to Certifier');
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
            versionNumber: 1,
            certificationSignatureIsValid: true,
            certificationUrl: {
              certificationSignature: 'signed',
              hashMatches: true
            }
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
            versionNumber: 1,
            certificationSignatureIsValid: false,
            certificationUrl: {
              certificationSignature: 'signed',
              hashMatches: false
            }
          }
        }}
        relay={null}
      />
    );
    expect(wrapper.find('CardHeader').text()).toBe('Error');
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
            versionNumber: 1,
            certificationSignatureIsValid: false,
            certificationUrl: {
              certificationSignature: undefined,
              hashMatches: true
            }
          }
        }}
        relay={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h5').at(1).text()).toBe(
      'Your application has been sent to a certifier. Submission will be possible once they have verified the data in the application.'
    );
  });
});
