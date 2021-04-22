import StatusBadgeColor from 'components/helpers/StatusBadgeColor';
import ProgressStepIndicator from 'components/ProgressStepIndicator';
import {mount} from 'enzyme';
import React from 'react';

describe('The Progress Step Indicator', () => {
  it('Renders with no steps', () => {
    const componentUnderTest = mount(<ProgressStepIndicator steps={[]} />);
    expect(componentUnderTest).toMatchSnapshot();
  });

  it('Matches snapshot with 3 steps', () => {
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

  const stepCountTestCases = [
    [1, StatusBadgeColor.APPROVED],
    [2, StatusBadgeColor.PENDING],
    [3, StatusBadgeColor.INITIAL],
    [4, StatusBadgeColor.REJECTED],
    [5, StatusBadgeColor.APPROVED],
    [6, StatusBadgeColor.PENDING]
  ];
  test.each(stepCountTestCases)(
    'Generates %p progress items',
    (stepCount: number, status: string) => {
      const steps = Array.from({length: stepCount}, (_, index) => ({
        badgeStyle: status,
        description: `test step ${index}`,
        number: index
      }));

      const componentUnderTest = mount(<ProgressStepIndicator steps={steps} />);
      expect(componentUnderTest.find('.numberedCircle')).toHaveLength(
        stepCount
      );
      componentUnderTest.find('.numberedCircle').forEach((wrapper, index) => {
        expect(wrapper.text()).toBe(`${index}`);
        expect(wrapper.hasClass('badge-' + status)).toBeTrue();
      });

      expect(componentUnderTest.find('div.stepDescription')).toHaveLength(
        stepCount
      );
      componentUnderTest
        .find('div.stepDescription')
        .forEach((wrapper, index) => {
          expect(wrapper.text()).toBe('test step ' + index);
        });
    }
  );
});
