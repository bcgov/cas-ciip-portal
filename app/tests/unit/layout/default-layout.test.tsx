import React from 'react';
import {shallow} from 'enzyme';
import {DefaultLayoutComponent} from 'layouts/default-layout';

describe('The DefaultLayout component', () => {
  it('when logged out matches the last accepted Snapshot', () => {
    const wrapper = shallow(<DefaultLayoutComponent session={null} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('when logged in matches the last accepted Snapshot', () => {
    const mockRefType: any = null;
    const user = {
      __typename: 'qq',
      firstName: 'Test',
      lastName: 'Tester',
      emailAddress: 'test-tester@testing.com',
      ' $fragmentRefs': mockRefType
    };
    const wrapper = shallow(
      <DefaultLayoutComponent
        session={{
          ciipUserBySub: user,
          userGroups: [],
          ' $refType': mockRefType
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
