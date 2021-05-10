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
    expect(1).toBe(2);
  });

  it('Displays the override justification when present', () => {
    expect(1).toBe(2);
  });

  it('Toggles the expanded vs collapsed view when clicking the link', () => {
    expect(1).toBe(2);
  });
});
