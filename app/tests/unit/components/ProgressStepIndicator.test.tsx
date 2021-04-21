import StatusBadgeColor from 'components/helpers/StatusBadgeColor';
import ProgressStepIndicator from 'components/ProgressStepIndicator';
import {mount} from 'enzyme';
import React from 'react';

describe('The Progress Step Indicator', () => {
  it('Renders with no steps', () => {
    const componentUnderTest = mount(<ProgressStepIndicator steps={[]} />);
    expect(componentUnderTest).toMatchSnapshot();
  });

  it('Matches snapshot with 3 tests', () => {
    const componentUnderTest = mount(
      <ProgressStepIndicator
        steps={[
          {
            badgeStyle: StatusBadgeColor.APPROVED,
            description: 'test step 1',
            number: 99
          },
          {
            badgeStyle: StatusBadgeColor.APPROVED,
            description: 'test step 2',
            number: 100
          },
          {
            badgeStyle: StatusBadgeColor.REJECTED,
            description: 'test step 3',
            number: 110
          }
        ]}
      />
    );
    expect(componentUnderTest).toMatchSnapshot();
    expect(componentUnderTest.find('.numberedCircle')).toHaveLength(3);
    expect(componentUnderTest.find('div.stepDescription')).toHaveLength(3);
  });

  const stepCountTestCases = [1, 2, 3, 4, 5, 6];
  test.each(stepCountTestCases)('Generates %p progress items', (stepCount) => {
    const steps = Array.from({length: stepCount}, (_, index) => ({
      badgeStyle: StatusBadgeColor.PENDING,
      description: `test step ${index}`,
      number: index
    }));

    const componentUnderTest = mount(<ProgressStepIndicator steps={steps} />);
    expect(componentUnderTest.find('.numberedCircle')).toHaveLength(stepCount);
    expect(componentUnderTest.find('div.stepDescription')).toHaveLength(
      stepCount
    );
  });
});
