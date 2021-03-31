import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationWizardConfirmationComponent} from 'containers/Applications/ApplicationWizardConfirmation';
import {ApplicationWizardConfirmation_application} from '__generated__/ApplicationWizardConfirmation_application.graphql';

describe('The Confirmation Component', () => {
  const application: ApplicationWizardConfirmation_application = {
    ' $refType': 'ApplicationWizardConfirmation_application',
    ' $fragmentRefs': {
      SubmitApplication_application: true,
      ApplicationDetailsContainer_application: true
    },
    id: 'abc',
    latestDraftRevision: {
      id: 'abc',
      overrideJustification: null
    },
    orderedFormResults: {
      edges: [
        {
          node: {
            formResult: {foo: 'bar'},
            formJsonByFormId: {
              formJson: {
                schema: {
                  type: 'object',
                  properties: {
                    foo: {type: 'string'}
                  },
                  required: ['foo']
                }
              }
            }
          }
        }
      ]
    }
  };

  it('shows the "submit application" button when there is no validation error', () => {
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query'
        }}
        application={application}
        relay={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Relay(SubmitApplicationComponent)').exists()).toBe(
      true
    );
  });
  it('shows a message instead of the "submit application" button when there are validation errors', () => {
    const applicationWithError = {
      ...application,
      orderedFormResults: {
        edges: [
          {
            node: {
              ...application.orderedFormResults.edges[0].node,
              formResult: {}
            }
          }
        ]
      }
    };
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query'
        }}
        application={applicationWithError}
        relay={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Relay(SubmitApplicationComponent)').exists()).toBe(
      false
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
        application={application}
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
    const applicationWithOverride = {
      ...application,
      latestDraftRevision: {
        ...application.latestDraftRevision,
        overrideJustification: 'I did a bad thing and I dont want to fix it'
      }
    };
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query'
        }}
        application={applicationWithOverride}
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
