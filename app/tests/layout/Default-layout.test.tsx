import React from 'react';
import {shallow} from 'enzyme';
import {DefaultLayoutComponent} from '../../layouts/default-layout';

// It renders the Default Layout

it('It matches the last accepted Snapshot', () => {
  const wrapper = shallow(
    <DefaultLayoutComponent
      session={null}
      needsSession={false}
      needsUser={false}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
