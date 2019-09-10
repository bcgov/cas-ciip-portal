import React from 'react';
import BaseForm from '../../pages/ciip-application';
import FormLoader from '../../components/Forms/FormLoader'
import { shallow, mount, render } from 'enzyme';


// It matches the last accepted Snapshot

it('It matches the last accepted Snapshot', () => {
    const wrapper = shallow(<BaseForm />);
    expect(wrapper).toMatchSnapshot();
});


// It renders a welcome message

it('It renders a welcome message', () => {
    const wrapper = shallow(<BaseForm />);
    const text = wrapper.find("p#welcome-message").text();
    expect(text).toContain('Welcome');
});

// Todo: It renders a user name

// Testing the CIIP Form

describe('Testing the CIIP form', () => {

    // It loads the <FormLoader>

    it('It loads the FormLoader', () => {
        const wrapper = mount(<BaseForm />);
        const text = wrapper.find("FormLoader").text();
        expect(text).toContain('Loading');
    });

});

// Clicking 'next' on empty form throws errors
