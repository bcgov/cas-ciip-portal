import {ApplicationReviewValidation} from 'containers/Applications/ApplicationReviewValidationContainer';
import {mount} from 'enzyme';
import React from 'react';
import {ApplicationReviewValidationContainer_applicationRevision} from '__generated__/ApplicationReviewValidationContainer_applicationRevision.graphql';

describe('The ApplicationReviewValidationContainer', () => {
  it('Matches the snapshot with failed validations', () => {
    const appRev: ApplicationReviewValidationContainer_applicationRevision = {
      ' $refType': 'ApplicationReviewValidationContainer_applicationRevision',
      overrideJustification: undefined,
      validation: {
        edges: [
          {
            node: {
              isOk: false,
              validationDescription: 'this is one failed test validation'
            }
          },
          {
            node: {
              isOk: false,
              validationDescription: 'this is another failed test validation'
            }
          },
          {
            node: {
              isOk: true,
              validationDescription: 'this is a passing validation'
            }
          }
        ]
      }
    };
    const componentUnderTest = mount(
      <ApplicationReviewValidation applicationRevision={appRev} />
    );

    expect(componentUnderTest).toMatchSnapshot();
  });

  it('Matches the snapshot with all passing validations', () => {
    const appRev: ApplicationReviewValidationContainer_applicationRevision = {
      ' $refType': 'ApplicationReviewValidationContainer_applicationRevision',
      overrideJustification: undefined,
      validation: {
        edges: [
          {
            node: {
              isOk: true,
              validationDescription: 'this is one passing test validation'
            }
          },
          {
            node: {
              isOk: true,
              validationDescription: 'this is another passing test validation'
            }
          }
        ]
      }
    };
    const componentUnderTest = mount(
      <ApplicationReviewValidation applicationRevision={appRev} />
    );

    expect(componentUnderTest).toMatchSnapshot();
  });

  it('Displays the override justification when present', () => {
    const appRev: ApplicationReviewValidationContainer_applicationRevision = {
      ' $refType': 'ApplicationReviewValidationContainer_applicationRevision',
      overrideJustification: 'I needed to override for testing purposes',
      validation: {
        edges: [
          {
            node: {
              isOk: true,
              validationDescription: 'this is a passing test validation'
            }
          },
          {
            node: {
              isOk: false,
              validationDescription: 'this is a failing test validation'
            }
          }
        ]
      }
    };
    const componentUnderTest = mount(
      <ApplicationReviewValidation applicationRevision={appRev} />
    );

    expect(componentUnderTest).toMatchSnapshot();
  });

  it('Toggles the expanded vs collapsed view when clicking the link', () => {
    const appRev: ApplicationReviewValidationContainer_applicationRevision = {
      ' $refType': 'ApplicationReviewValidationContainer_applicationRevision',
      overrideJustification: 'I have overridden things',
      validation: {
        edges: [
          {
            node: {
              isOk: true,
              validationDescription: 'this is one passing test validation'
            }
          },
          {
            node: {
              isOk: false,
              validationDescription: 'this is a failing test validation'
            }
          }
        ]
      }
    };
    const componentUnderTest = mount(
      <ApplicationReviewValidation applicationRevision={appRev} />
    );

    const expandLink = componentUnderTest.find('#toggle-expanded-validation');

    // \u00a0 is unicode for non-breakable space
    expect(expandLink.text()).toEqual('See all validation details\u00a0\u00a0');

    expect(componentUnderTest.text()).not.toInclude(
      'this is a failing test validation'
    );
    expect(componentUnderTest.text()).not.toInclude('I have overridden things');

    expandLink.simulate('click');

    const collapseLink = componentUnderTest.find('#toggle-expanded-validation');
    expect(collapseLink.text()).toEqual('Hide validation details\u00a0\u00a0');
    expect(componentUnderTest.text()).toInclude(
      'this is a failing test validation'
    );
    expect(componentUnderTest.text()).toInclude('I have overridden things');

    collapseLink.simulate('click');

    expect(componentUnderTest.text()).not.toInclude(
      'this is a failing test validation'
    );
    expect(componentUnderTest.text()).not.toInclude('I have overridden things');
  });
});
