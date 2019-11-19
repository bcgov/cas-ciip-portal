import React from 'react';
import {render} from 'enzyme';
import IncentiveSegmentFormula from 'components/Incentives/IncentiveSegmentFormula';

// It renders the formula

it('It matches the last accepted Snapshot', () => {
  const wrapper = render(<IncentiveSegmentFormula />);
  expect(wrapper).toMatchSnapshot();
});

// Todo: Explore why MathJax is not being loaded by mount?
