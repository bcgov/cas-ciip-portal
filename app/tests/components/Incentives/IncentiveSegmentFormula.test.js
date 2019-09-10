import React from 'react';
import IncentiveSegmentFormula from '../../../components/Incentives/IncentiveSegmentFormula'
import { shallow, mount, render } from 'enzyme';



// It renders the formula

it('It matches the last accepted Snapshot', () => {
    const wrapper = render(<IncentiveSegmentFormula />);
    expect(wrapper).toMatchSnapshot();
});



// Todo: Explore why MathJax is not being loaded by mount?