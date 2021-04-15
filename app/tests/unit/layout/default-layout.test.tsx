import React from 'react';
import {shallow} from 'enzyme';
import {DefaultLayoutComponent} from 'layouts/default-layout';
import {defaultLayout_session} from '__generated__/defaultLayout_session.graphql';

describe('The DefaultLayout component', () => {
  it('when logged out matches the last accepted Snapshot', () => {
    const wrapper = shallow(<DefaultLayoutComponent session={null} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('when logged in matches the last accepted Snapshot', () => {
    const session = {
      ' $refType': 'defaultLayout_session',
      ciipUserBySub: {
        ' $refType': 'UserProfileDropdown_user',
        firstName: 'Test',
        lastName: 'Tester',
        emailAddress: 'test-tester@testing.com',
        ' $fragmentRefs': {
          UserProfileDropdown_user: true
        }
      },
      userGroups: [],
      ' $fragmentRefs': {
        defaultLayout_session: true
      }
    };

    const wrapper = shallow(
      <DefaultLayoutComponent session={session as defaultLayout_session} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
