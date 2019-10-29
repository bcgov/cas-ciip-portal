import React from 'react';
import {shallow} from 'enzyme';
import {OrganisationsComponent} from '../../../containers/Organisations/Organisations';

describe('Organisations', () => {
  it('should render no organisations if the user has not requested any access', async () => {
    const query = {
      user: {
        id: 'id',
        userOrganisationsByUserId: {edges: []}
      },
      allOrganisations: {edges: []}
    };
    const r = shallow(<OrganisationsComponent query={query} />);
    expect(r).toMatchSnapshot();
  });
  it("should render the user's requested organisations", async () => {
    const query = {
      user: {
        id: 'id',
        userOrganisationsByUserId: {
          edges: [
            {
              node: {
                id: 'OrgId'
              }
            }
          ]
        }
      },
      allOrganisations: {edges: []}
    };
    const r = shallow(<OrganisationsComponent query={query} />);
    expect(r).toMatchSnapshot();
    expect(
      r.find('Relay(UserOrganisationComponent)').prop('userOrganisation')
    ).toBe(query.user.userOrganisationsByUserId.edges[0].node);
  });
});
