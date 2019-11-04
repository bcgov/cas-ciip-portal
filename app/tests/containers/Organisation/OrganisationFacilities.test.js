import React from 'react';
import {shallow} from 'enzyme';
import {OrganisationFacilitiesComponent} from '../../../containers/Organisations/OrganisationFacilities';

describe('OrganisationFacilities', () => {
  it('should render no OrganisationFacilities if the organisation has no facilities', async () => {
    const query = {
      organisation: {
        id: 'id',
        facilitiesByOrganisationId: {edges: []}
      }
    };
    const r = shallow(<OrganisationFacilitiesComponent query={query} />);
    expect(r).toMatchSnapshot();
  });
  it("should render the organisation's facilities", async () => {
    const query = {
      organisation: {
        id: 'id',
        facilitiesByOrganisationId: {
          edges: [
            {
              node: {
                id: 'FacId'
              }
            }
          ]
        }
      }
    };
    const r = shallow(<OrganisationFacilitiesComponent query={query} />);
    expect(r).toMatchSnapshot();
    expect(r.find('Relay(FacilityComponent)').prop('facility')).toBe(
      query.organisation.facilitiesByOrganisationId.edges[0].node
    );
  });
});
