import React from 'react';
import {shallow} from 'enzyme';
import BaseForm from '../../pages/form';

// It matches the last accepted Snapshot

it('It matches the last accepted Snapshot', () => {
  const wrapper = shallow(<BaseForm />);
  expect(wrapper).toMatchSnapshot();
});

// It renders a welcome message

it('It renders a welcome message', () => {
  const wrapper = shallow(<BaseForm />);
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
