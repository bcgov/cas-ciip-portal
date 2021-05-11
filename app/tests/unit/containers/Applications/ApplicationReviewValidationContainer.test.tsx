import {ApplicationReviewValidation} from 'containers/Applications/ApplicationReviewValidationContainer';
import {mount} from 'enzyme';
import React from 'react';
import {ApplicationReviewValidationContainer_applicationRevision} from '__generated__/ApplicationReviewValidationContainer_applicationRevision.graphql';

const getTestRevision: (
  overrideJustification: string,
  passedValidationCount: number,
  failedValidationCount: number
) => ApplicationReviewValidationContainer_applicationRevision = (
  overrideJustification = undefined,
  passedValidationCount = 0,
  failedValidationCount = 0
) => {
  const edges = [];
  for (let i = 0; i < passedValidationCount; i++) {
    edges.push({
      node: {isOk: true, validationDescription: `passed validation ${i}`}
    });
  }
  for (let i = 0; i < failedValidationCount; i++) {
    edges.push({
      node: {isOk: false, validationDescription: `failed validation ${i}`}
    });
  }

  return {
    ' $refType': 'ApplicationReviewValidationContainer_applicationRevision',
    overrideJustification,
    validation: {
      edges
    }
  };
};

describe('The ApplicationReviewValidationContainer', () => {
  it('Matches the snapshot with failed validations', () => {
    const appRev = getTestRevision(undefined, 0, 2);
    const componentUnderTest = mount(
      <ApplicationReviewValidation applicationRevision={appRev} />
    );
    expect(componentUnderTest).toMatchSnapshot();
  });

  it('Matches the snapshot with all passing validations', () => {
    const appRev = getTestRevision(undefined, 2, 0);
    const componentUnderTest = mount(
      <ApplicationReviewValidation applicationRevision={appRev} />
    );

    expect(componentUnderTest).toMatchSnapshot();
  });

  it('Displays the override justification when present', () => {
    const appRev = getTestRevision('override has been justified', 1, 1);
    const componentUnderTest = mount(
      <ApplicationReviewValidation applicationRevision={appRev} />
    );

    expect(componentUnderTest).toMatchSnapshot();
  });

  it('Toggles the expanded vs collapsed view when clicking the link', () => {
    const appRev = getTestRevision('overridden', 1, 1);
    const componentUnderTest = mount(
      <ApplicationReviewValidation applicationRevision={appRev} />
    );

    const expandLink = componentUnderTest.find('.btn.btn-link');

    expect(expandLink.text()).toEqual('See all validation details');

    expect(componentUnderTest.text()).not.toInclude('failed validation 0');
    expect(componentUnderTest.text()).not.toInclude('overridden');

    expandLink.simulate('click');

    const collapseLink = componentUnderTest.find('.btn.btn-link');
    expect(collapseLink.text()).toEqual('Hide validation details');
    expect(componentUnderTest.text()).toInclude('failed validation 0');
    expect(componentUnderTest.text()).toInclude('overridden');

    collapseLink.simulate('click');

    expect(componentUnderTest.text()).not.toInclude('failed validation 0');
    expect(componentUnderTest.text()).not.toInclude('overridden');
  });
});
