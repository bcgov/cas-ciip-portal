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
          ' $refType': 'ApplicationWizardConfirmation_query',
          application: {
            ' $fragmentRefs': {
              SubmitApplication_application: true
            },
            id: 'abc',
            rowId: 1,
            certificationSignature: undefined,
            applicationStatus: {
              id: 'def'
            }
          }
        }}
        relay={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should show the Generate Confirmation Page dialog when certificationSignature is undefined', () => {
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query',
          application: {
            ' $fragmentRefs': {
              SubmitApplication_application: true
            },
            id: 'abc',
            rowId: 1,
            certificationSignature: undefined,
            applicationStatus: {
              id: 'def'
            }
          }
        }}
        relay={null}
      />
    );
    expect(
      wrapper
        .find('h5')
        .at(1)
        .text()
    ).toBe(
      'Thank you for reviewing the application information. You may now generate a Certification page to be signed prior to submission.'
    );
    expect(
      wrapper
        .find('Button')
        .at(0)
        .text()
    ).toBe('Generate Certification Page');
  });

  it('should show the Submit application dialog when certificationSignature is defined', () => {
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query',
          application: {
            ' $fragmentRefs': {
              SubmitApplication_application: true
            },
            id: 'abc',
            rowId: 1,
            certificationSignature: 'signed',
            applicationStatus: {
              id: 'def'
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
});
