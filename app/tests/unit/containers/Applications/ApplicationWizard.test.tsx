import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationWizardComponent} from 'containers/Applications/ApplicationWizard';
import {ApplicationWizard_query} from 'ApplicationWizard_query.graphql';
import ViewApplication from 'pages/reporter/application/[applicationId]/version/[versionNumber]/view';

const getTestQuery = () => {
  return {
    ' $refType': 'ApplicationWizard_query',
    ' $fragmentRefs': {ApplicationWizardStep_query: true},
    application: {
      ' $fragmentRefs': {ApplicationFormNavbar_application: true},
      currentUserCanEdit: true,
      id: 'id123',
      latestDraftRevision: {
        versionNumber: 1
      },
      latestSubmittedRevision: {
        versionNumber: 1
      },
      applicationRevisionByStringVersionNumber: {
        isImmutable: true
      },
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
      },
      orderedFormResults: {
        edges: []
      }
    }
  };
};

describe('The application wizard component', () => {
  describe('when given an immutable application version', () => {
    let replaceFn;
    beforeEach(() => {
      const useRouter = jest.spyOn(require('next/router'), 'useRouter');
      replaceFn = jest.fn();
      useRouter.mockImplementation(() => ({
        pathname: '/reporter/application',
        query: {
          applicationId: 'id123',
          version: 1
        },
        replace: replaceFn
      }));
    });

    it('should redirect to the view application page if this is the latest version', () => {
      const data = getTestQuery();
      shallow(
        <ApplicationWizardComponent
          loading={false}
          query={data as ApplicationWizard_query}
        />
      );

      expect(replaceFn).toBeCalledWith(ViewApplication.getRoute('id123', 1));
    });

    it('should redirect to the page for the latest draft version if there is one', () => {
      const version1 = getTestQuery();
      const version2 = {
        ...version1,
        application: {
          ...version1.application,
          latestDraftRevision: {
            versionNumber: 2
          }
        }
      };
      shallow(
        <ApplicationWizardComponent
          loading={false}
          query={version2 as ApplicationWizard_query}
        />
      );

      expect(replaceFn).toBeCalledWith({
        pathname: '/reporter/application',
        query: {
          applicationId: 'id123',
          version: 2
        }
      });
    });
  });
});
