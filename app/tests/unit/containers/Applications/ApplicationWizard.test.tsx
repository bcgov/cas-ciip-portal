import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationWizardComponent} from 'containers/Applications/ApplicationWizard';
import {ApplicationWizard_query} from 'ApplicationWizard_query.graphql';
import {ApplicationWizard_applicationRevision} from '__generated__/ApplicationWizard_applicationRevision.graphql';

describe('The application wizard component', () => {
  const queryFragment: ApplicationWizard_query = {
    ' $refType': 'ApplicationWizard_query',
    ' $fragmentRefs': {ApplicationWizardStep_query: true}
  };

  const applicationRevisionFragment: ApplicationWizard_applicationRevision = {
    ' $refType': 'ApplicationWizard_applicationRevision',
    ' $fragmentRefs': {
      ApplicationWizardStep_applicationRevision: true,
      ApplicationFormNavbar_applicationRevision: true
    },
    versionNumber: 1,
    orderedFormResults: {
      edges: [
        {
          node: {
            ' $fragmentRefs': {
              ApplicationWizardStep_formResult: true
            },
            formJsonByFormId: {id: 'form1'}
          }
        }
      ]
    },
    applicationByApplicationId: {
      applicationReviewStepsByApplicationId: {
        edges: [
          {
            node: {
              reviewCommentsByApplicationReviewStepId: {
                edges: [
                  {
                    node: {
                      description: 'This is a test comment.'
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    }
  };

  let replaceFn;
  beforeEach(() => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    replaceFn = jest.fn();
    useRouter.mockImplementation(() => ({
      pathname: '/reporter/application/[applicationId]',
      query: {
        applicationId: 'id123',
        formId: 'form1'
      },
      replace: replaceFn
    }));
  });

  it('only renders the ApplicationDecision component if the version number is greater than 1', () => {
    const firstVersionComponent = shallow(
      <ApplicationWizardComponent
        applicationRevision={applicationRevisionFragment}
        query={queryFragment}
      />
    );
    expect(firstVersionComponent.exists('Relay(ApplicationWizardStep)')).toBe(
      true
    );
    expect(
      firstVersionComponent
        .find('Relay(ApplicationWizardStep)')
        .first()
        .prop('review')
    ).toBeNull();

    const secondVersionComponent = shallow(
      <ApplicationWizardComponent
        applicationRevision={{...applicationRevisionFragment, versionNumber: 2}}
        query={queryFragment}
      />
    );
    expect(secondVersionComponent.exists('Relay(ApplicationWizardStep)')).toBe(
      true
    );
    expect(
      secondVersionComponent
        .find('Relay(ApplicationWizardStep)')
        .first()
        .prop('review')
    ).toBeTruthy();
  });

  it('passes a single list of comments to the ApplicationDecision component', () => {});

  it("passes a form result to ApplicationWizardStep based on the query string's formId", () => {});

  it('triggers a redirect to display the first form if formId is not present in the query string', () => {});

  it('navigates to the next step when a step is completed', () => {});

  it('navigates to the summary page when the last step is completed', () => {});
});
