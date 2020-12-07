import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationWizardComponent} from 'containers/Applications/ApplicationWizard';

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

    it('should redirect to the view-application page if this is the latest version', () => {
      shallow(
        <ApplicationWizardComponent
          query={{
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
              orderedFormResults: {
                edges: []
              }
            }
          }}
        />
      );

      expect(replaceFn).toBeCalledWith({
        pathname: '/reporter/view-application',
        query: {
          applicationId: 'id123',
          version: 1
        }
      });
    });

    it('should redirect to the page for the latest draft version if there is one', () => {
      shallow(
        <ApplicationWizardComponent
          query={{
            ' $refType': 'ApplicationWizard_query',
            ' $fragmentRefs': {ApplicationWizardStep_query: true},
            application: {
              ' $fragmentRefs': {ApplicationFormNavbar_application: true},
              currentUserCanEdit: true,
              id: 'id123',
              latestDraftRevision: {
                versionNumber: 2
              },
              latestSubmittedRevision: {
                versionNumber: 1
              },
              applicationRevisionByStringVersionNumber: {
                isImmutable: true
              },
              orderedFormResults: {
                edges: []
              }
            }
          }}
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
