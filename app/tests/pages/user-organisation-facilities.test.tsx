import React from 'react';
import {shallow} from 'enzyme';
import UserOrganisationFacilities from '../../pages/user-organisation-facilities';

describe('UserOrganisationFacilities page', () => {
  it('matches the last accepted Snapshot', () => {
    const wrapper = shallow(
      <UserOrganisationFacilities
        query={{organisation: {operatorName: 'Org'}}}
        router={{query: {organisationId: 'id'}}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
