import React from 'react';
import {shallow} from 'enzyme';
import {UserOrganisationComponent} from '../../../containers/Organisations/UserOrganisation';

describe('UserOrganisation', () => {
  it('should render null if no userOrganisation is passed as props', async () => {
    const userOrganisation = null;
    const r = shallow(
      <UserOrganisationComponent userOrganisation={userOrganisation} />
    );
    expect(r).toMatchSnapshot();
    expect(r.exists('Badge')).toEqual(false);
  });
  it('should render a userOrganisation if the userOrganisation is passed as props', async () => {
    const userOrganisation = {
      status: 'active',
      organisationByOrganisationId: {
        id: 'orgId'
      }
    };
    const r = shallow(
      <UserOrganisationComponent userOrganisation={userOrganisation} />
    );
    expect(r).toMatchSnapshot();
    expect(r.find('Badge').text()).toBe('active');
  });
});
