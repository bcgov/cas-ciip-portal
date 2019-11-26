import React from 'react';
import {shallow} from 'enzyme';
import ViewApplication from '../../pages/view-application';

const query = {
  session: null,
  application: {
    id: '1',
    formResultsByApplicationId: {
      edges: [{node: {id: 'form-1'}}]
    }
  }
};

// It matches the last accepted Snapshot
it('It matches the last accepted Snapshot', () => {
  const wrapper = shallow(<ViewApplication query={query} />);
  expect(wrapper).toMatchSnapshot();
});

it('It passes a query to the ApplicationDetailsComponent component', () => {
  const wrapper = shallow(<ViewApplication query={query} />);
  expect(
    wrapper
      .find('Relay(ApplicationDetailsComponent)')
      .first()
      .prop('query')
  ).toBe(query);
});
