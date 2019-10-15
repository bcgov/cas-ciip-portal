import React from 'react';
import {shallow} from 'enzyme';
import CiipApplication from '../../pages/ciip-application';

// It matches the last accepted Snapshot

it.skip('It matches the last accepted Snapshot', () => {
  const wrapper = shallow(<CiipApplication />);
  expect(wrapper).toMatchSnapshot();
});

// It renders a welcome message

it.skip('It renders a welcome message', () => {
  const wrapper = shallow(<CiipApplication />);
  const text = wrapper.find('p#welcome-message').text();
  expect(text).toContain('Welcome');
});

// Todo: It renders a user name

// Testing the CIIP Form
// TODO: I think testing the form should be moved into a test of the container itself

// describe('Testing the CIIP form', () => {
//   // It loads the <FormLoader>

//   it('It loads the FormLoaderContainer', () => {
//     const wrapper = mount(<BaseForm />);
//     const text = wrapper.find('FormLoaderContainer').text();
//     expect(text).toContain('Loading');
//   });
// });

// Clicking 'next' on empty form throws errors
