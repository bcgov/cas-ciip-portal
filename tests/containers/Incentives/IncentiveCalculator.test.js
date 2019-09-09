import React from 'react';
import BaseForm from '../../pages/application-details';
import { shallow, mount, render } from 'enzyme';


// It matches the last accepted Snapshot

it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(<BaseForm />);
    expect(wrapper).toMatchSnapshot();
});


// It renders the formula

// It renders the table with products and calculation

// It calculates the proper incentive if props exist

// It fails gracefully if benchmark and et don't exist

// It generates the chart if data exists

// It calculates the correct values for BM < Q < ET

// It calculates the correct values for BM > Q (i.e. I = 0)

// It calculates the correct values for Q > ET (i.e. I = 0)

// It calculates the correct total