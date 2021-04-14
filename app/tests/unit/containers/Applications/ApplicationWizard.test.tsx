import React, {ReactElement} from 'react';
import {shallow} from 'enzyme';
import {ApplicationWizardComponent} from 'containers/Applications/ApplicationWizard';
import {ApplicationWizard_query} from 'ApplicationWizard_query.graphql';
import {ApplicationWizard_applicationRevision} from '__generated__/ApplicationWizard_applicationRevision.graphql';
import {getApplicationPageRoute} from 'routes';

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
        },
        {
          node: {
            ' $fragmentRefs': {
              ApplicationWizardStep_formResult: true
            },
            formJsonByFormId: {id: 'form2'}
          }
        }
      ]
    },
    applicationByApplicationId: {
      id: 'id123',
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
          },
          {
            node: {
              reviewCommentsByApplicationReviewStepId: {
                edges: [
                  {
                    node: {
                      description: 'This is another test comment.'
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
  let pushFn;
  let useRouter;
  beforeEach(() => {
    useRouter = jest.spyOn(require('next/router'), 'useRouter');
    replaceFn = jest.fn();
    pushFn = jest.fn();
    useRouter.mockImplementation(() => ({
      pathname: '/reporter/application/[applicationId]',
      query: {
        applicationId: 'id123',
        formId: 'form1'
      },
      replace: replaceFn,
      push: pushFn
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

  it('passes a single list of comments to the ApplicationDecision component', () => {
    const wrapper = shallow(
      <ApplicationWizardComponent
        applicationRevision={{...applicationRevisionFragment, versionNumber: 2}}
        query={queryFragment}
      />
    );

    const applicationDecision: ReactElement = wrapper
      .find('Relay(ApplicationWizardStep)')
      .first()
      .prop('review');

    expect(applicationDecision.props.reviewComments).toEqual([
      'This is a test comment.',
      'This is another test comment.'
    ]);
  });

  it("passes a form result to ApplicationWizardStep based on the query string's formId", () => {
    let wrapper = shallow(
      <ApplicationWizardComponent
        applicationRevision={applicationRevisionFragment}
        query={queryFragment}
      />
    );

    expect(
      wrapper.find('Relay(ApplicationWizardStep)').first().prop('formResult')
    ).toEqual(applicationRevisionFragment.orderedFormResults.edges[0].node);

    useRouter.mockImplementation(() => ({
      pathname: '/reporter/application/[applicationId]',
      query: {
        applicationId: 'id123',
        formId: 'form2'
      },
      replace: replaceFn,
      push: pushFn
    }));

    wrapper = shallow(
      <ApplicationWizardComponent
        applicationRevision={applicationRevisionFragment}
        query={queryFragment}
      />
    );

    expect(
      wrapper.find('Relay(ApplicationWizardStep)').first().prop('formResult')
    ).toEqual(applicationRevisionFragment.orderedFormResults.edges[1].node);
  });

  it('triggers a redirect to display the first form if formId is not present in the query string', () => {
    useRouter.mockImplementation(() => ({
      pathname: '/reporter/application/[applicationId]',
      query: {
        applicationId: 'id123'
      },
      replace: replaceFn,
      push: pushFn
    }));

    shallow(
      <ApplicationWizardComponent
        applicationRevision={applicationRevisionFragment}
        query={queryFragment}
      />
    );
    const newRoute = getApplicationPageRoute('id123', 'form1', false);

    expect(replaceFn).toBeCalledWith(newRoute, newRoute, {shallow: true});
  });

  it('navigates to the next step when a step is completed', () => {
    const wrapper = shallow(
      <ApplicationWizardComponent
        applicationRevision={applicationRevisionFragment}
        query={queryFragment}
      />
    );

    const onStepComplete: () => void = wrapper
      .find('Relay(ApplicationWizardStep)')
      .first()
      .prop('onStepComplete');

    onStepComplete();

    const newRoute = getApplicationPageRoute('id123', 'form2', false);

    expect(pushFn).toBeCalledWith(newRoute, newRoute, {shallow: true});
  });

  it('navigates to the summary page when the last step is completed', () => {
    useRouter.mockImplementation(() => ({
      pathname: '/reporter/application/[applicationId]',
      query: {
        applicationId: 'id123',
        formId: 'form2'
      },
      replace: replaceFn,
      push: pushFn
    }));

    const wrapper = shallow(
      <ApplicationWizardComponent
        applicationRevision={applicationRevisionFragment}
        query={queryFragment}
      />
    );

    const onStepComplete: () => void = wrapper
      .find('Relay(ApplicationWizardStep)')
      .first()
      .prop('onStepComplete');

    onStepComplete();

    const newRoute = getApplicationPageRoute('id123', undefined, true);

    expect(pushFn).toBeCalledWith(newRoute, newRoute, {shallow: true});
  });
});
