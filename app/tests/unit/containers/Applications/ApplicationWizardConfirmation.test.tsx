import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationWizardConfirmationComponent} from 'containers/Applications/ApplicationWizardConfirmation';
import {ApplicationWizardConfirmation_applicationRevision} from 'ApplicationWizardConfirmation_applicationRevision.graphql';

describe('The Confirmation Component', () => {
  const applicationRevision: ApplicationWizardConfirmation_applicationRevision = {
    ' $refType': 'ApplicationWizardConfirmation_applicationRevision',
    ' $fragmentRefs': {
      SubmitApplication_applicationRevision: true,
      ApplicationDetailsContainer_applicationRevision: true
    },
    id: 'abc',
    overrideJustification: null,
    versionNumber: 1,
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
    },
    validation: {
      edges: []
    },
    applicationByApplicationId: {
      reportingYear: 2020
    }
  };

  it('shows the "submit application" button when there is no validation error', () => {
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query',
          openedReportingYear: {reportingYear: 2020}
        }}
        applicationRevision={applicationRevision}
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
      ...applicationRevision,
      orderedFormResults: {
        edges: [
          {
            node: {
              ...applicationRevision.orderedFormResults.edges[0].node,
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
          ' $refType': 'ApplicationWizardConfirmation_query',
          openedReportingYear: {reportingYear: 2020}
        }}
        applicationRevision={applicationWithError}
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
          ' $refType': 'ApplicationWizardConfirmation_query',
          openedReportingYear: {reportingYear: 2020}
        }}
        applicationRevision={applicationRevision}
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
      ...applicationRevision,
      overrideJustification: 'I did a bad thing and I dont want to fix it'
    };
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query',
          openedReportingYear: {reportingYear: 2020}
        }}
        applicationRevision={applicationWithOverride}
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

  it('should render the validation alert if there are validations where isOk is false', () => {
    const applicationWithValidationErrors = {
      ...applicationRevision,
      validation: {
        edges: [
          {
            node: {
              validationFailedMessage: 'I failed',
              isOk: false,
              validationDescription: 'failed'
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
          ' $refType': 'ApplicationWizardConfirmation_query',
          openedReportingYear: {reportingYear: 2020}
        }}
        applicationRevision={applicationWithValidationErrors}
        relay={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('li').text()).toBe('I failed');
  });

  it('should not render the validation alert if there are validations where isOk is true, but none where isOk is false', () => {
    const applicationWithValidationErrors = {
      ...applicationRevision,
      validation: {
        edges: [
          {
            node: {
              validationFailedMessage: 'I passed',
              isOk: true,
              validationDescription: 'do not render me'
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
          ' $refType': 'ApplicationWizardConfirmation_query',
          openedReportingYear: {reportingYear: 2020}
        }}
        applicationRevision={applicationWithValidationErrors}
        relay={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.exists('Alert')).toBe(false);
  });

  it('does not show the "submit application" button when the application reporting year does not match the open reporting year and versionNumber = 1', () => {
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query',
          openedReportingYear: {reportingYear: 2021}
        }}
        applicationRevision={applicationRevision}
        relay={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Relay(SubmitApplicationComponent)').exists()).toBe(
      false
    );
  });

  it('does not show the "submit application" button when the reporting year is closed and versionNumber = 1', () => {
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query',
          openedReportingYear: null
        }}
        applicationRevision={applicationRevision}
        relay={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Relay(SubmitApplicationComponent)').exists()).toBe(
      false
    );
  });

  it('shows the "submit application" button when the application reporting year does not match the open reporting year and versionNumber > 1', () => {
    const applicationRevision: ApplicationWizardConfirmation_applicationRevision = {
      ' $refType': 'ApplicationWizardConfirmation_applicationRevision',
      ' $fragmentRefs': {
        SubmitApplication_applicationRevision: true,
        ApplicationDetailsContainer_applicationRevision: true
      },
      id: 'abc',
      overrideJustification: null,
      versionNumber: 2,
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
      },
      validation: {
        edges: []
      },
      applicationByApplicationId: {
        reportingYear: 2020
      }
    };
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query',
          openedReportingYear: {reportingYear: 2021}
        }}
        applicationRevision={applicationRevision}
        relay={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Relay(SubmitApplicationComponent)').exists()).toBe(
      true
    );
  });

  it('shows the "submit application" button when the reporting year is closed and versionNumber > 1', () => {
    const applicationRevision: ApplicationWizardConfirmation_applicationRevision = {
      ' $refType': 'ApplicationWizardConfirmation_applicationRevision',
      ' $fragmentRefs': {
        SubmitApplication_applicationRevision: true,
        ApplicationDetailsContainer_applicationRevision: true
      },
      id: 'abc',
      overrideJustification: null,
      versionNumber: 2,
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
      },
      validation: {
        edges: []
      },
      applicationByApplicationId: {
        reportingYear: 2020
      }
    };
    const wrapper = shallow(
      <ApplicationWizardConfirmationComponent
        query={{
          ' $fragmentRefs': {
            ApplicationDetailsContainer_query: true
          },
          ' $refType': 'ApplicationWizardConfirmation_query',
          openedReportingYear: null
        }}
        applicationRevision={applicationRevision}
        relay={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Relay(SubmitApplicationComponent)').exists()).toBe(
      true
    );
  });
});
