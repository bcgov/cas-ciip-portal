import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationWizardConfirmationComponent} from 'containers/Applications/ApplicationWizardConfirmation';

describe('The Confirmation Component', () => {
  it('Match the snapshot and show the submit application button', () => {
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
            overrideJustification: null
          }
        }}
        relay={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Relay(SubmitApplicationComponent)').exists()).toBe(
      true
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
