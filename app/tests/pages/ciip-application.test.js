import React from 'react';
import {shallow} from 'enzyme';
import CiipApplication from '../../pages/ciip-application';

const query = {
  allFormJsons: {
    edges: [{node: {id: 'form-1'}}]
  }
};

// It matches the last accepted Snapshot
it('It matches the last accepted Snapshot', () => {
  const wrapper = shallow(<CiipApplication />);
  expect(wrapper).toMatchSnapshot();
});

// It renders a welcome message

it('It renders a welcome message', () => {
  const wrapper = shallow(<CiipApplication />);
  const text = wrapper.find('p#welcome-message').text();
  expect(text).toContain('Welcome');
});

it('It passes a query to the ApplicationWizard component', () => {
  const wrapper = shallow(<CiipApplication query={query} />);
  expect(
    wrapper
      .find('ForwardRef(Relay(ApplicationWizard))')
      .first()
      .prop('formJson')
  ).toBe(query.allFormJsons.edges.node);
});
