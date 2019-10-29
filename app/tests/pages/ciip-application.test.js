import React from 'react';
import {shallow} from 'enzyme';
import CiipApplication from '../../containers/pageContainers/CiipApplication';

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

it('It passes a query to the ApplicationWizard component', () => {
  const wrapper = shallow(<CiipApplication query={query} />);
  expect(
    wrapper
      .find('Relay(ApplicationWizard)')
      .first()
      .prop('formJson')
  ).toBe(query.allFormJsons.edges.node);
});
